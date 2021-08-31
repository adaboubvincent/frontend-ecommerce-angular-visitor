import { Component, OnInit } from '@angular/core';
import { FournisseurUserService } from '../services/fournisseur_user/fournisseur-user.service';
import { Commande } from '../models/Commande';
import { ProduitACommander } from '../models/ProduitACommander';
import { CommandeService } from '../services/commande/commande.service';
import { PanierService } from '../services/panier/panier.service';
import { FournisseurUser } from '../models/FournisseurUser';
import * as $ from 'jquery';

@Component({
  selector: 'app-fournisseur-list-produit-commandes',
  templateUrl: './fournisseur-list-produit-commandes.component.html',
  styleUrls: ['./fournisseur-list-produit-commandes.component.css']
})
export class FournisseurListProduitCommandesComponent implements OnInit {

  commandes: Commande[] = [];
  fournisseurUser: FournisseurUser = new FournisseurUser();

  role: string | null = (localStorage.getItem('role')) ? localStorage.getItem('role') : "Iconnue";

  constructor(private fournisseurUserService: FournisseurUserService,
    private commandeService: CommandeService, private panierService: PanierService) { }

  ngOnInit(): void {
    
    if(this.role == "FOURNISSEUR"){
      this.fournisseurUserService.getFournisseurUser().subscribe((res: FournisseurUser) => {
        this.fournisseurUser = res;
      });
    }

    this.commandeService.commandes.subscribe((cats: Commande[]) => {
      this.commandes = cats;
      this.commandes.forEach((item, index) => {
        this.panierService.getProduitACommandeByPanier(item.panier?.id).subscribe((resP: ProduitACommander[]) => {
          this.commandes[index].produitAcommandes = resP;
          console.log(this.commandes[index]?.produitAcommandes);
          console.log(this.fournisseurUser);
          var fournisseurUser = this.fournisseurUser;
          this.commandes[index].produitAcommandes = this.commandes[index]?.produitAcommandes?.filter((item) => item?.produit?.fournisseur?.id === fournisseurUser?.id);
       
        });
        

        this.panierService.getPrixTotalPanierId(item.panier?.id).subscribe((resP: any) => {
          this.commandes[index].get_prix_total_panier = resP?.get_prix_total_panier;
          this.commandes[index].get_prix_total_final_panier = resP?.get_prix_total_final_panier;
        });

        
      })
    });
    
    this.commandeService.emitGetCommandes();
  }

}
