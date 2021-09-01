import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, Subject } from 'rxjs';
import { Panier } from 'src/app/models/Panier';
import { PanierProduitACommander } from 'src/app/models/PanierProduitACommander';
import { ProduitACommander } from 'src/app/models/ProduitACommander';
import { Text } from 'src/app/models/Text';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService extends DaoService<Panier> {

  panierProduitACommander = new Subject<PanierProduitACommander>();
  getPrixTotalPanierSubject = new Subject<any>();

  constructor(http: HttpClient) {
    super(http);
   }


   
ajouterAuPanier(token: string | null, idProduit: number | undefined, quantite: number): Observable<Text> {
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+token
    }),
    bodey: token
  };
  return this.http.get<Text>(this.url + "ajouter-au-panier/"+idProduit+"/"+quantite+"/", options);
}

   
private getPanier(token: string | null): Observable<PanierProduitACommander> {
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+token
    }),
    bodey: token
  };
  return this.http.get<PanierProduitACommander>(this.url + "get-panier/", options);
}

emitPanierProduitACommander(){
  this.getPanier(localStorage.getItem('token')).subscribe((res: PanierProduitACommander) => {
		this.panierProduitACommander.next(res)
	});
}


quantitePlusOuMoinsDuProduit(idProduitACommander: number | undefined, p: number): Observable<Text> {
 
  return this.http.get<Text>(this.url + "quantite-plus-ou-moins-du-produit/"+Number(idProduitACommander)+"/"+p+"/");
}

private getPrixTotalPanier(token: string | null): Observable<PanierProduitACommander> {
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+token
    }),
    bodey: token
  };
  return this.http.get<PanierProduitACommander>(this.url + "get-prix-total-panier/", options);
}

emitGetPrixTotalPanier(){
  this.getPrixTotalPanier(localStorage.getItem('token')).subscribe((res: any) => {
		this.getPrixTotalPanierSubject.next(res)
	});
}


getPrixTotalPanierId(id: number | undefined): Observable<any> {
 
  return this.http.get<any>(this.url + "get-prix-total-panier-id/"+id+"/");
}


getProduitACommandeByPanier(id: number | undefined):  Observable<Array<ProduitACommander>>{
  return this.http.get<Array<ProduitACommander>>(this.url + "get-produit-a-commande-by-panier/"+id+"/");
}


}



