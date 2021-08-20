import { Injectable } from '@angular/core';
import { FournisseurUser } from '../../models/FournisseurUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DaoService } from '../dao/dao.service';
import { Produit } from 'src/app/models/Produit';

@Injectable({
  providedIn: 'root'
})
export class FournisseurUserService extends DaoService<FournisseurUser> {

  constructor(http: HttpClient) {
    super(http);
   }


   getFournisseurUser(): Observable<FournisseurUser>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage.getItem('token')
      })
    };

    return this.http.get<FournisseurUser>(this.url+"fournisseur/compte/", options);
   }

   getProduitFournisseurUser(): Observable<Array<Produit>>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage.getItem('token')
      })
    };

    return this.http.get<Array<Produit>>(this.url+"produit-fournisseur/", options);
   }



   
}
