import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Commande } from 'src/app/models/Commande';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService extends DaoService<Commande> {
  commandes = new Subject<Array<Commande>>();
  constructor(http: HttpClient) {
    super(http);
    //service  , service: NotificationsService
   }
    commandesProduitsDuFournisseur(): Observable<Array<Commande>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage.getItem('token')
      }),
      body: localStorage.getItem('token')
    };
    return this.http.get<Array<Commande>>(this.url + "commandes-fournisseur/", options);
  }

   


   emitGetCommandes(){
    this.commandesProduitsDuFournisseur().subscribe((res: Commande[]) => {
      this.commandes.next(res);
    });
  }
}
