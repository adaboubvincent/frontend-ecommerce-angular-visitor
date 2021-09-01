import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Categorie } from '../models/Categorie';
import { Image } from '../models/Image';
import { Produit } from '../models/Produit';
import { ProduitImage } from '../models/ProduitImage';
import { Text } from '../models/Text';
import { CategoryService } from '../services/category/category.service';
import { ImageService } from '../services/image/image.service';
import { PanierService } from '../services/panier/panier.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-visiteur-detail-produit',
  templateUrl: './visiteur-detail-produit.component.html',
  styleUrls: ['./visiteur-detail-produit.component.css']
})
export class VisiteurDetailProduitComponent implements OnInit {
  idProduit: number = 0;
  produits: Produit[] = [];
  produitsListSearch: ProduitImage[] = [];

  produit: Produit = new Produit();
  images: Image[] = [];
  imageChoice: Image = new Image();
  url: string = environment.APIEndpoint;
  categorie: Categorie = new Categorie();

  constructor(private panierService: PanierService,private produitService: ProductService, 
    private route: ActivatedRoute, private imagesService: ImageService, private categorieService: CategoryService) { }

  ngOnInit(): void {

    this.produitService.getAll("produits/").subscribe((prots: Produit[]) => {
      this.produits = prots;
      if(this.route.snapshot.params['id']){
        this.idProduit = this.route.snapshot.params['id'];
        this.produit = this.findObject();

        this.categorie = this.produit.categories?.find((item, index) => index === 0) || new Categorie();
        
        this.imagesService.imagesOfProduit(Number(this.idProduit)).subscribe((res: Image[]) => {
          this.images = res;
          this.imageChoice = this.images[0] || new Image();
        });

        this.categorieService.searhProduitByCategory(this.categorie.nom).subscribe((pds: Produit[]) => {
          this.produitsListSearch = pds;
          for(let i = 0; i < this.produitsListSearch.length; i++){
            if(this.produitsListSearch[i].quantite > 0 ){
              this.imagesService.imageOfProduit(Number(this.produitsListSearch[i].id)).subscribe((res: Image) => {
                this.produitsListSearch[i].image = res;
                this.produitsListSearch[i].categorie = 	this.produitsListSearch[i].categories?.find((item, index) => index === 0) ||  new Categorie();
                });
            }

          }
        });


      }
    });
  }

  findObject(): Produit {
    return this.produits.find((item) => item.id === Number(this.idProduit) ) || new Produit()
  }

  showOnImageClick(id: number | undefined){
    let img = new Image();
    img.image = "/media/default.jpg";

    this.imageChoice = this.images.find((item) => item.id === Number(id)) || img;
 
    
  }


  
  addProductToCart(id: number | undefined){
    this.panierService.ajouterAuPanier(localStorage.getItem('token'), id, 1).subscribe((res: Text) => {
      if(res.text === "produit ajoute avec succes!"){
        this.produitService.notificationAjouter(res.text || "", "success");
      }else{
        this.produitService.notificationAjouter(res.text || "", "warning");
      }
      
      this.panierService.emitPanierProduitACommander();
      
    },
    (error) => this.produitService.notificationAjouter("Veuillez vous connecter!" || "", "warning"));
  }

}
