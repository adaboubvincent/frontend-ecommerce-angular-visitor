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
  constructor(private produitService: ProductService, private imagesService: ImageService, private panierService: PanierService,
    private produitacommanderService: ProduitacommanderService, private paiementService: PaiementService, 
    private commanderService: CommanderService, private route: Router,
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

    this.clientService.getClient().subscribe((res: Client) => {
      this.client = res;
    });

    this.fournisseurUserService.getFournisseurUser().subscribe((res: FournisseurUser) => {
      this.client = res;
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

  /* showCommandePage(){
    this.route.navigate(['#/commander'])
  } */

  showCommandePage(){
    /* 
      """
        Nom	                Description
        tx_reference	    Identifiant Unique générée par PayGateGlobal pour la transaction
        identifier	        Identifiant interne de la transaction de l’e-commerce. ex: Numero de commande Cet identifiant doit etre unique.
        payment_reference	Code de référence de paiement généré par Flooz. Ce code peut être utilisé en cas de résolution de problèmes ou de plaintes.
        amount	            Montant payé par le client
        datetime	        Date and Heure de paiement
        payment_method	    Méthode de paiement utilisée par le client. Valeurs possibles: FLOOZ, T-Money
        phone_number	    Numéro de téléphone du client qui a effectué le paiement.
        """

        """
        Les valeurs possible de la transaction sont:
        0 : Transaction enregistrée avec succès
        2 : Jeton d’authentification invalide
        4 : Paramètres Invalides
        6 : Doublons détectées. Une transaction avec le même identifiant existe déja.
      """
    */

      if(String(this.client.telephone) != String(0) && this.client.adresse != ""){
        this.remplireInfos = false;
        var d = new Date();
        var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
//prixTotalPanierFinal
        this.infosPaiement = new InfosPaiement(String(this.client.telephone), String(this.prixTotalPanierFinal), date+hours, "http://127.0.0.1:8882/commander-effectuee");
      
        window.location.href = "https://paygateglobal.com/v1/page?token="+"c038a374-b987-475a-abf9-5895f3a56b1b&amount="+this.infosPaiement?.montant+"&description="+this.infosPaiement?.description+"&identifier="+this.infosPaiement?.identifierCommande+"&url="+this.infosPaiement?.urlRedirectApresPaiement+"&phone="+this.infosPaiement?.phoneClient;

      }else{
        this.remplireInfos = true;
        this.commanderService.notificationAjouter("Veuilez remplir vos informations nécessaire pour la livraison", "warning");
      }
      
    
  }



  check(){
    if ( this.checked === false){
      this.checked = true;
    }else{
      this.checked = false;
    }
  }

}




