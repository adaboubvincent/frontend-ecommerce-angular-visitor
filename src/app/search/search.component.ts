import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  BASE_URL: string = this.produitService.BASE_URL;
  question: string = ""
  listeQuestion: string[] = [];

  produits: ProduitImage[] = [];
  produitsListSearch: ProduitImage[] = [];

  constructor(private panierService: PanierService,private route: ActivatedRoute, private produitService: ProductService
    , private imagesService: ImageService, private categorieService: CategoryService, private rt: Router) {

     }

  ngOnInit(): void {
    this.search();


  }
  search(){
    if(this.route.snapshot.params['q']){
      this.question = this.route.snapshot.params['q'];
      if(this.question.includes("---")){
        this.question = this.question.replace("---", "");
        this.categorieService.searhProduitByCategory(this.question).subscribe((pds: Produit[]) => {
          this.produitsListSearch = pds;
          this.question += " (Catégorie)";
          for(let i = 0; i < this.produitsListSearch.length; i++){
            if(this.produitsListSearch[i].quantite > 0 ){
              this.imagesService.imageOfProduit(Number(this.produitsListSearch[i].id)).subscribe((res: Image) => {
                this.produitsListSearch[i].image = res;
                this.produitsListSearch[i].categorie = 	this.produitsListSearch[i].categories?.find((item, index) => index === 0) ||  new Categorie();
                });
            }

          }
        });
      }else{
        this.produitService.searhProduit(this.question).subscribe((pds: Produit[]) => {
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



      /* this.listeQuestion = this.question.split(' ');

      this.produitService.getAll("produits/").subscribe((pds: Produit[]) => {
        this.produits = pds;

        this.produits.forEach((item) =>{
            if(item.nom?.toLocaleLowerCase().search(this.question.toLocaleLowerCase())  !== -1 ){
              this.produitsListSearch.push(item);
            }

        } );

        for(let i = 0; i < this.produits.length; i++){
          for(let ii = 0 ; ii < this.listeQuestion.length; ii++){
            if(this.produits[i].nom?.toLocaleLowerCase().search(this.listeQuestion[ii].toLocaleLowerCase()) !== -1){
              this.produitsListSearch.push(this.produits[i]);
            }
          }
        }
        let pIs = this.produitsListSearch;
        this.produitsListSearch = this.produitsListSearch.filter(function(ele , pos){
            return pIs.indexOf(ele) == pos;
        })




        for(let i = 0; i < this.produitsListSearch.length; i++){
          this.imagesService.imageOfProduit(Number(this.produitsListSearch[i].id)).subscribe((res: Image) => {
          this.produitsListSearch[i].image = res;
          this.produitsListSearch[i].categorie = 	this.produitsListSearch[i].categories?.find((item, index) => index === 0) ||  new Categorie();
          });
        }
      });
 */
    }

  }
  showPageDetailProduit(id: number | undefined = 0){
    this.rt.navigate(['#/produit/#/detail', id]);
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
