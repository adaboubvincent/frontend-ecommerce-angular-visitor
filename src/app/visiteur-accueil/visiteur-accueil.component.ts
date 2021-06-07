import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { environment } from 'src/environments/environment';
import { Categorie } from '../models/Categorie';
import { Image } from '../models/Image';
import { Produit } from '../models/Produit';
import { ProduitImage } from '../models/ProduitImage';
import { Text } from '../models/Text';
import { ImageService } from '../services/image/image.service';
import { PanierService } from '../services/panier/panier.service';
import { ProductService } from '../services/product/product.service';
import { SecurityService } from '../services/user/security.service';
import { VisiteurBaseComponent } from '../visiteur-base/visiteur-base.component';

@Component({
  selector: 'app-visiteur-accueil',
  templateUrl: './visiteur-accueil.component.html',
  styleUrls: ['./visiteur-accueil.component.css']
})
export class VisiteurAccueilComponent implements OnInit {
	url: string = environment.APIEndpoint;
	produits: ProduitImage[] = [];
	image: Image = new Image();

  produits1: ProduitImage[] = [];
  produits2: ProduitImage[] = [];
  produits3: ProduitImage[] = [];
  produits4: ProduitImage[] = [];
  produits5: ProduitImage[] = [];
  produits6: ProduitImage[] = [];

  estCommande: boolean = false;
  constructor(private produitService: ProductService, private route: Router, private imagesService: ImageService,
    private panierService: PanierService, private securityService: SecurityService, private routerActive: ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem('pageReload') === 'true'){
      localStorage.setItem('pageReload', 'false');
      window.location.reload();
    }
    /* 
    this.routerActive.queryParams
      .subscribe(params => {
        if(params.estCommande === "true") {
          this.estCommande = true;
          //window.location.reload();
        }
      }
    ); */
	this.produitService.getAll("produits/").subscribe((pds: Produit[]) => {
		this.produits = pds;
		for(let i = 0; i < this.produits.length; i++){
      if(this.produits[i].quantite > 0 ){
        this.imagesService.imageOfProduit(Number(this.produits[i].id)).subscribe((res: Image) => {
          this.produits[i].image = res;
          this.produits[i].categorie = 	this.produits[i].categories?.find((item, index) => index === 0) ||  new Categorie();
          });
      }
		}

    //produis 1
    if(this.produits.length > 0){
      for(let i = 0; i < 3; i++){
        if(this.produits.find((item, index) => index === i)){
          this.produits1.push(this.produits[i])
        }
        
      }
      
    }
	  

    //produis 2
    if(this.produits.length > 3){
      for(let i = 3; i < 6; i++){
        if(this.produits.find((item, index) => index === i)){
          this.produits2.push(this.produits[i])
        }
      }
    }

    //produis 3
    if(this.produits.length > 6){
      for(let i = 6; i < 9; i++){
        if(this.produits.find((item, index) => index === i)){
          this.produits3.push(this.produits[i])
        }
      }
    }

    //produis 4
    if(this.produits.length > 9){
      for(let i = 9; i < 12; i++){
        if(this.produits.find((item, index) => index === i)){
          this.produits4.push(this.produits[i])
        }
      }
    }

    //produis 5
    if(this.produits.length > 12){
      for(let i = 12; i < 15; i++){
        if(this.produits.find((item, index) => index === i)){
          this.produits5.push(this.produits[i])
        }
      }
    }

    //produis 6
    if(this.produits.length > 15){
      for(let i = 15; i < 18; i++){
        if(this.produits.find((item, index) => index === i)){
          this.produits6.push(this.produits[i])
        }
      }
    }



    
	  });

    


  }

  showPageDetailProduit(id: number | undefined = 0){
    this.route.navigate(['#/produit/#/detail', id])
  }


  addProductToCart(id: number | undefined){
    this.panierService.ajouterAuPanier(localStorage.getItem('token'), id, 1).subscribe((res: Text) => {
      if(res.text === "produit ajoute avec succes!"){
        this.produitService.notificationAjouter(res.text || "", "success");
      }else{
        this.produitService.notificationAjouter(res.text || "", "warning");
      }
      
      this.panierService.emitPanierProduitACommander();
      /* let visit: VisiteurBaseComponent = new VisiteurBaseComponent(this.produitService, this.route, this.imagesService, this.securityService, this.panierService);
      visit.ngOnInit(); */
    },
    (error) => this.produitService.notificationAjouter("Veuillez vous connecter!" || "", "warning"));
  }
}
