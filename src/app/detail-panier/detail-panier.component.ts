import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../models/Image';
import { Panier } from '../models/Panier';
import { PanierProduitACommander } from '../models/PanierProduitACommander';
import { ProduitACommander } from '../models/ProduitACommander';
import { Text } from '../models/Text';
import { ImageService } from '../services/image/image.service';
import { PanierService } from '../services/panier/panier.service';
import { ProductService } from '../services/product/product.service';
import { ProduitacommanderService } from '../services/produitacommander/produitacommander.service';

@Component({
  selector: 'app-detail-panier',
  templateUrl: './detail-panier.component.html',
  styleUrls: ['./detail-panier.component.css']
})
export class DetailPanierComponent implements OnInit {
	loadingPage: boolean = false;
	isSearchMode: boolean = false;
	url: string = this.produitService.BASE_URL;
	image: Image = new Image();
  checked: boolean = false;

	username: string | null = "";
	is_superuser: string | null = "";

	panier: Panier | undefined = new Panier();
	productsACommander: ProduitACommander[] = [];

	prixTotalPanier = 0;
	prixTotalPanierFinal = 0;
  constructor(private produitService: ProductService, private imagesService: ImageService, private panierService: PanierService,
    private produitacommanderService: ProduitacommanderService, private route: Router) { }

  ngOnInit(): void {
    this.panierService.panierProduitACommander.subscribe((res: PanierProduitACommander) => {
      this.panier = res.panier;
      this.productsACommander = res.produit_a_commander || [];
      for (let i = 0; i < this.productsACommander.length; i++) {
        this.imagesService.imageOfProduit(Number(this.productsACommander[i].produit?.id)).subscribe((res: Image) => {
          this.productsACommander[i].image = res;
        })
      }


    });
    this.panierService.emitPanierProduitACommander();

    this.panierService.getPrixTotalPanierSubject.subscribe((res: any) => {
      this.prixTotalPanier = res.get_prix_total_panier;
      this.prixTotalPanierFinal = res.get_prix_total_final_panier;

    });
    this.panierService.emitGetPrixTotalPanier();
    $('.search-person').hide();
    $('.search-show-search').click((event) => {
      event.preventDefault();
      //$('.search').show();
      console.log($('.search').is('visible'));
      $('.search-person').toggle(1000);

    });
  }




  supprimerProduitACommanderDansPanier(id: number | undefined){
    this.produitacommanderService.deletT("supprimer-produit-a-commander-dans-panier/"+id+"/").subscribe((res) => {
      this.produitService.notificationAjouter("Produit supprimer dans le panier", "warning");
      this.panierService.emitPanierProduitACommander();
      this.panierService.emitGetPrixTotalPanier();
    },
    (error) => {
      this.produitService.notificationAjouter("Une erreur c'est produit", "warning");
      this.panierService.emitPanierProduitACommander();
      this.panierService.emitGetPrixTotalPanier();
    })
  }
  DiminuQuantiteProduit(id: number | undefined){
	  this.panierService.quantitePlusOuMoinsDuProduit(id, 0).subscribe((res: Text) => {
		  this.panierService.emitPanierProduitACommander();
		  this.panierService.emitGetPrixTotalPanier();
	  },
	  (error) => {
		  this.produitService.notificationAjouter(error.error.text || "", "warning");
	  });
  }

  AugmenteQuantiteProduit(id: number | undefined){
    this.panierService.quantitePlusOuMoinsDuProduit(id, 1).subscribe((res: Text) => {
      this.panierService.emitPanierProduitACommander();
      this.panierService.emitGetPrixTotalPanier();
    },
    (error) => {
      this.produitService.notificationAjouter(error.error.text || "", "warning");
    });
  }

  multiple(firstNumber: number | undefined, secondNumber: number | undefined){
    return (firstNumber || 0) * (secondNumber || 0);
  }

  showPageDetailProduit(id: number | undefined = 0){
    console.log("=========>", id)
    this.route.navigate(['#/produit/#/detail', id])
  }

  showCommandePage(){
    this.route.navigate(['#/commander'])
  }
  check(){
    if ( this.checked === false){
      this.checked = true;
    }else{
      this.checked = false;
    }
  }

}




