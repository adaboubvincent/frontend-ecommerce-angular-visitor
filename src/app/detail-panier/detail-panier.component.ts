import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../models/Image';
import { InfosPaiement } from '../models/infosPaiement';
import { Panier } from '../models/Panier';
import { PanierProduitACommander } from '../models/PanierProduitACommander';
import { ProduitACommander } from '../models/ProduitACommander';
import { Text } from '../models/Text';
import { ImageService } from '../services/image/image.service';
import { PaiementService } from '../services/paiement/paiement.service';
import { PanierService } from '../services/panier/panier.service';
import { ProductService } from '../services/product/product.service';
import { ProduitacommanderService } from '../services/produitacommander/produitacommander.service';
import { CommanderService } from '../services/commander/commander.service';
import { Client } from '../models/Client';
import { ClientService } from '../services/client/client.service';
import { FournisseurUserService } from '../services/fournisseur_user/fournisseur-user.service';
import { FournisseurUser } from '../models/FournisseurUser';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';

interface MyObj {
  tx_reference: Number;
  status: Number;
}

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

  infosPaiement?: InfosPaiement;
  client: Client | FournisseurUser = new Object();
  remplireInfos: boolean = false;
  isPossibleToCommande = false;

  isTrainingCommande = false;

  formNumero = this.fb.group({
    numero: ['', Validators.required]
  });

  role: string | null = (localStorage.getItem('role')) ? localStorage.getItem('role') : "Iconnue";

  constructor(private produitService: ProductService, private imagesService: ImageService, private panierService: PanierService,
    private produitacommanderService: ProduitacommanderService, private paiementService: PaiementService, 
    private commanderService: CommanderService, private route: Router, private fb: FormBuilder,
    private clientService: ClientService, private fournisseurUserService: FournisseurUserService) { }

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

    if(this.role == "FOURNISSEUR"){
      this.fournisseurUserService.getFournisseurUser().subscribe((res: FournisseurUser) => {
      this.client = res;
    });
    }else if(this.role == "CLIENT"){
      this.clientService.getClient().subscribe((res: Client) => {
        this.client = res;
      });
    }
    
    this.formNumero.get('numero')?.setValue((this.client.telephone) ? String(this.client.telephone) : "");

    if(String(this.client.telephone) != String(0) && this.client.adresse != ""){
      this.isPossibleToCommande = true;
    }

    
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


  getReseau(){
    if(this.formNumero.get('numero')?.value.length == 8){
      var existeFlooz = ["99", "98", "97", "96", "79","78", "77", "76"].findIndex((item) => {
        return this.formNumero.get('numero')?.value.startsWith(item);
      });
      var existeTmoney = ["90", "91", "92", "93", "94","70", "71", "72", "73", "74"].findIndex((item) => {
        return this.formNumero.get('numero')?.value.startsWith(item);
      })
      return existeFlooz !== -1
            ? "FLOOZ"
            : existeTmoney !== -1 ? "TMONEY" : "...";
    }
    return "..."
    
  }
  /* showCommandePage(){
    this.route.navigate(['#/commander'])
  } */

  showCommandePage(){
    

      if(String(this.client.telephone) != String(0) && this.client.adresse != ""){
        this.remplireInfos = false;
        this.isTrainingCommande = true;
        let d = new Date();
        let date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        let date_hours = date + " " + hours;

        this.paiementService.paiement_reference(date_hours, "enregistrer").subscribe((res)=>{
          //this.infosPaiement = new InfosPaiement(String(this.client.telephone), "25", date_hours, "http://127.0.0.1:8882/commander-effectuee");
          
          localStorage.setItem("identifier", date_hours);
          //window.location.href = "https://paygateglobal.com/v1/page?token="+"c038a374-b987-475a-abf9-5895f3a56b1b&amount="+this.infosPaiement?.montant+"&description="+this.infosPaiement?.description+"&identifier="+this.infosPaiement?.identifierCommande+"&url="+this.infosPaiement?.urlRedirectApresPaiement+"&phone="+this.infosPaiement?.phoneClient;
          /* this.paiementService.paiement_flooz_tmoney_post("25", "", date_hours, this.formNumero.get('numero')?.value, this.getReseau()).subscribe((res)=>{
           
            if(res?.status == 0){
              this.commanderService.notificationAjouter("Veuillez valider votre transaction en cours!", "success");
            }else{
              this.commanderService.notificationAjouter("Un problème a été survenu. Veuillez réessayer", "warning");
            }
            this.isTrainingCommande =false;

          },
          (error)=>{
            console.log(error);
            this.commanderService.notificationAjouter("Un problème a été survenu. Veuillez réessayer", "warning");
            this.isTrainingCommande =false;
          }); */




/* 
          var url = "https://paygateglobal.com/api/v1/pay";

var xhr = new XMLHttpRequest();
xhr.open("POST", url); */

/* xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json"); 
'Accept': 'application/json',
      'Content-Type': 'application/json'*/
/* var data = `{
  "auth_token": "c038a374-b987-475a-abf9-5895f3a56b1b",
  "amount": "25",
  "description": "description",
  "identifier": "201002010020100",
  "phone_number": "97838526",
  "network": "FLOOZ"
}`;

xhr.send(data); */

/* xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }}; */
/*    const response = await fetch("https://paygateglobal.com/api/v1/pay", {
    method: 'POST',
    headers: {
      
    },
    body: `{
      "auth_token": "c038a374-b987-475a-abf9-5895f3a56b1b",
      "amount": "25",
      "description": "description",
      "identifier": "201002010020100",
      "phone_number": "97838526",
      "network": "FLOOZ"
    }`,
    }); 
    
    response.json().then(data => {
      console.log(data);
    });  

*/

    /* $.ajax({
      type: "POST",
      url: "https://paygateglobal.com/api/v1/pay/?auth_token=c038a374-b987-475a-abf9-5895f3a56b1b&amount=25&identifier="+date_hours+"&phone_number="+this.formNumero.get('numero')?.value+"&network="+this.getReseau(),
      data: JSON.stringify({
        auth_token: "c038a374-b987-475a-abf9-5895f3a56b1b",
        amount: "25",
        description: "description",
        identifier: "2010007",
        phone_number: "97838526",
        network: "FLOOZ"
      }),
      success: function (result) {
        console.log(result);
        this.isTrainingCommande =false;
        if(result?.status == 0){
          //this.commanderService.notificationAjouter("Veuillez valider votre transaction en cours!", "success");
        }else{
          //this.commanderService.notificationAjouter("Un problème a été survenu. Veuillez réessayer", "warning");
        }
        window.location.href = "http://127.0.0.1:8882/commander-effectuee";
        
      },
      error: function (result, status) {
        console.log(result);
        this.isTrainingCommande =false;
        //this.commanderService.notificationAjouter("Un problème a été survenu. Veuillez réessayer", "warning");
      }
      
   }); */


   var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://paygateglobal.com/api/v1/pay/?auth_token=c038a374-b987-475a-abf9-5895f3a56b1b&amount="+this.prixTotalPanierFinal+"&identifier="+date_hours+"&phone_number="+this.formNumero.get('numero')?.value+"&network="+this.getReseau());
  /* xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json"); */
  var commanderService = this.commanderService;
  var isTrainingCommande = true;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if(xhr.status === 200){
        let res: MyObj = JSON.parse(xhr.responseText);
        if(res.status == 0){
          commanderService.notificationAjouter("Veuillez valider votre transaction en cours!", "success");
          window.location.href = "http://127.0.0.1:8882/commander-effectuee";
        }else{
          commanderService.notificationAjouter("Un problème a été survenu. Veuillez réessayer", "warning");
        }
        
      }
    }
    isTrainingCommande =false;
  };
    
  var data = `{
          "auth_token": "c038a374-b987-475a-abf9-5895f3a56b1b",
          "amount": "25",
          "description": "description",
          "identifier": ${date_hours},
          "phone_number": ${this.formNumero.get('numero')?.value},
          "network": ${this.getReseau()}
        }`;

  xhr.send(data);
  this.isTrainingCommande = isTrainingCommande;



    
   //this.commanderService.notificationAjouter("Veuillez valider votre transaction en cours!", "success");



        },
        (error)=>{
          console.log(error);
          this.isTrainingCommande =false;
        });

        
      }else{
        this.remplireInfos = true;
        this.commanderService.notificationAjouter("Veuilez remplir vos informations nécessaire pour la livraison", "warning");
      }
      
    
  }

  paiement(){

  }



  check(){
    if ( this.checked === false){
      this.checked = true;
    }else{
      this.checked = false;
    }
  }

}




