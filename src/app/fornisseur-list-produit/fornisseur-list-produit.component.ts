import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/Produit';
import { Router } from '@angular/router';
import { Categorie } from '../models/Categorie';
import { CategoryService } from '../services/category/category.service';
import { ImageService } from '../services/image/image.service';
import { FournisseurUser } from '../models/FournisseurUser';
import { FournisseurUserService } from '../services/fournisseur_user/fournisseur-user.service';

import { Image } from '../models/Image';
import { ProduitImage } from '../models/ProduitImage';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-fornisseur-list-produit',
  templateUrl: './fornisseur-list-produit.component.html',
  styleUrls: ['./fornisseur-list-produit.component.css']
})
export class FornisseurListProduitComponent implements OnInit {

  
  URL_BASE: string = this.produitService.BASE_URL;
  afficheMessageAlert = false;
  message = "";

  produitChoix: Produit | undefined = new Produit();

  produits: ProduitImage[] = [];
  image: Image = new Image();

  constructor(private categoryService: CategoryService, private route: Router, private produitService: ProductService,
    private fournisseurUserService: FournisseurUserService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.fournisseurUserService.getProduitFournisseurUser().subscribe((pds: Produit[]) => {
      this.produits = pds;
      for(let i = 0; i < this.produits.length; i++){
        this.imageService.imageOfProduit(Number(this.produits[i].id)).subscribe((res: Image) => {
          this.produits[i].image = res;
          this.produits[i].categorie = 	this.produits[i].categories?.find((item, index) => index === 0) ||  new Categorie();
        })
      }
     

    });
  }

  
  deleteProduit(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer ce produit ?")){
     
      this.produitService.deletT("produit/"+id+"/", this.produits.find((item) => {
          return item.id === id
        })).subscribe(res =>{
            let etat = res;
            this.ngOnInit();
      });
      
      this.messageAlert("Un produit a été supprimé!");
    }
    
  }


  messageAlert(message: string){
    this.afficheMessageAlert = true;
    this.message = message;
    setTimeout(() => {
      this.afficheMessageAlert = false;
      this.message = "";
    }, 3000);
  }

  showPageEdit(id: number | undefined = 0){
    this.route.navigate(['profile/produit/modifier', id]);
  }

  showPageDetail(id: number | undefined = 0){
    this.route.navigate(['profile/produit/detail', id]);
  }

  showPageDetailProduit(id: number | undefined = 0){
    this.route.navigate(['#/produit/#/detail', id]);
  }

  noAction(id: number){
    $('.no-action').click((event) => event.preventDefault());
    
    this.produitChoix = this.produits.find((item) => item.id === Number(id));
  }

  showImage(id: number | undefined){
    this.imageService.imageOfProduit(Number(id)).subscribe((res: Image) => {
      this.image = res;
    })
  }


}
