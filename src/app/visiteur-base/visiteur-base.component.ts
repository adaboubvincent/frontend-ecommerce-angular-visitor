import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { Image } from '../models/Image';
import { Panier } from '../models/Panier';
import { PanierProduitACommander } from '../models/PanierProduitACommander';
import { Produit } from '../models/Produit';
import { ProduitACommander } from '../models/ProduitACommander';
import { ProduitImage } from '../models/ProduitImage';
import { Text } from '../models/Text';
import { ImageService } from '../services/image/image.service';
import { PanierService } from '../services/panier/panier.service';
import { ProductService } from '../services/product/product.service';
import { SecurityService } from '../services/user/security.service';
import { ProduitacommanderService } from '../services/produitacommander/produitacommander.service';
import { CategoryService } from '../services/category/category.service';
import { Categorie } from '../models/Categorie';

$('.search-person').hide();

@Component({
  selector: 'app-visiteur-base',
  templateUrl: './visiteur-base.component.html',
  styleUrls: ['./visiteur-base.component.css']
})
export class VisiteurBaseComponent implements OnInit {
	loadingPage: boolean = false;
	isSearchMode: boolean = false;
	url: string = this.produitService.BASE_URL;
	produits: ProduitImage[] = [];
	image: Image = new Image();

	username: string | null = "";
	is_superuser: string | null = "";
	role: string | null = "";

	panier: Panier | undefined = new Panier();
	productsACommander: ProduitACommander[] = [];

	prixTotalPanier = 0;
	prixTotalPanierFinal = 0;
	categories: Categorie[] = [];


  constructor(private produitService: ProductService, private route: Router, private imagesService: ImageService, 
	private securityService: SecurityService, private panierService: PanierService, 
	private produitacommanderService: ProduitacommanderService, private categorieService: CategoryService) { }

  ngOnInit(): void {
	if(this.loadingPage === true ){
		this.loadingPage = false;
		this.route.navigate(['']);
	}

	this.categorieService.getAll("categories/").subscribe((res: Categorie[]) => {
		this.categories = res;
	});
	
	this.securityService.user(localStorage.getItem('token')).subscribe((res) => {
		let r = res;
	},
	(error) => {
		localStorage.setItem('token', "");
		localStorage.setItem('id', "");
		localStorage.setItem('username', "");
		localStorage.setItem('email', "");
		localStorage.setItem('is_superuser', "");
		localStorage.setItem('role', "");
	});

	this.username = localStorage.getItem('username');
	this.is_superuser = localStorage.getItem('is_superuser');
	this.role = localStorage.getItem('role');

	this.produitService.getAll("produits/").subscribe((pds: Produit[]) => {
		this.produits = pds;
		for(let i = 0; i < this.produits.length; i++){
			if(this.produits[i].quantite > 0 ){
				this.imagesService.imageOfProduit(Number(this.produits[i].id)).subscribe((res: Image) => {
					this.produits[i].image = res;
				  });
			}
		 
		}
	   
  
	});

	this.panierService.panierProduitACommander.subscribe((res: PanierProduitACommander) => {
		this.panier = res.panier;
		this.productsACommander = res.produit_a_commander || [];
		for(let i = 0; i < this.productsACommander.length; i++){
			this.imagesService.imageOfProduit(Number(this.productsACommander[i].produit?.id)).subscribe((res: Image) => {
			  this.productsACommander[i].image = res;
			})
		  }


	});
	this.panierService.emitPanierProduitACommander();

	this.panierService.getPrixTotalPanierSubject.subscribe((res: any) => {
		this.prixTotalPanier = res.get_prix_total_panier;
		this.prixTotalPanierFinal = res.get_prix_total_final_panier;
		
	},
	(error) =>{
		if(error.statusText == "Unauthorized"){
			localStorage.setItem('token', "");
			localStorage.setItem('id', "");
			localStorage.setItem('username', "");
			localStorage.setItem('email', "");
			localStorage.setItem('is_superuser', "");
			localStorage.setItem('role', "");

			this.username = localStorage.getItem('username');
			this.is_superuser = localStorage.getItem('is_superuser');
			this.role = localStorage.getItem('role');
			window.location.reload();
		}
	});
	this.panierService.emitGetPrixTotalPanier();
	$('.search-person').hide();
	$('.search-show-search').click((event) => {
		event.preventDefault();
		//$('.search').show();
		console.log($('.search').is('visible'));
		$('.search-person').toggle(1000);
		
	})

  }

  logout(){
	  this.securityService.logout(localStorage.getItem('token')).subscribe((res) => {
		this.produitService.notificationAjouter("Vous êtes déconnecté maintenant!", "success");
		window.location.reload();
	});

	localStorage.setItem('token', "");
	//localStorage.setItem('idPanier', "");
	localStorage.setItem('id', "");
	localStorage.setItem('username', "");
	localStorage.setItem('email', "");
	localStorage.setItem('is_superuser', "");
	localStorage.setItem('role', "");

	this.username = localStorage.getItem('username');
	this.is_superuser = localStorage.getItem('is_superuser');
	this.role = localStorage.getItem('role');

	this.loadingPage = true;
	window.location.reload();
	
    
  }

  showPageAdmin(){
	localStorage.setItem('admin', "true");
	this.route.navigate(['admin/produit/liste'])
	  
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


search(){
	let valeur = $('#search__input').val();
	this.route.navigate(['#/recherche', valeur]);

	this.route.routeReuseStrategy.shouldReuseRoute = function () {
		return false;
	  };
}
searchByCategory(categorie: string | undefined){
	this.route.navigate(['#/recherche', categorie+"---"]);

	this.route.routeReuseStrategy.shouldReuseRoute = function () {
		return false;
	  };
}

clickBars(){
	$('#bars-open').css('display', 'none');
	$('#times-close').css('display', 'block');
	$('.NavbarItems').css('display', 'block');
}

clickTimes(){
	$('#times-close').css('display', 'none');
	$('#bars-open').css('display', 'block');
	$('.NavbarItems').css('display', 'none');
}

userShowUl(){
	if($('.customer-links').css('display') == 'block'){
		$('.customer-links').css('display', 'none');
	}else{
		$('.customer-links').css({
			'display': 'block',
			'transition': 'all 1s ease'
		});
	}
	
}

cartMobile(){
	if($('.site-cart').css('display') == 'block'){
		$('.site-cart').css('display', 'none');
	}else{
		$('.site-cart').css({
			'display': 'block',
			'transition': 'all 1s ease'
		});
	}
}

displayNonePanierMobile(){
	$('.site-cart').css('display', 'none');
}

}
