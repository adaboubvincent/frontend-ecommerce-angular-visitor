import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DaoService } from '../dao/dao.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService extends DaoService<any> {

  constructor(http: HttpClient) {
    super(http);
   }

   paiement_flooz_tmoney(infosPaiement: any | null): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage.getItem('token')
      }),
      body: infosPaiement
    };
    return this.http.post<Text>(this.url + "paiement-flooz-tmoney/", infosPaiement, options);
  }

  paiement_flooz(infosPaiement: any | null): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage.getItem('token')
      }),
      body: infosPaiement
    };
    return this.http.post<Text>(this.url + "paiement-flooz/", infosPaiement, options);
  }
}
