import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DaoService } from '../dao/dao.service';
import { Observable } from 'rxjs';
import { InfosPaiement } from 'src/app/models/infosPaiement';


@Injectable({
  providedIn: 'root'
})
export class PaiementService extends DaoService<any> {

  constructor(http: HttpClient) {
    super(http);
   }

   paiement_flooz_tmoney(infosPaiement: InfosPaiement | null): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage.getItem('token')
      }),
      body: infosPaiement
    };
    return this.http.post<Text>(this.url + "paiement-flooz-tmoney/", infosPaiement, options);
  }
  /* requests.get("https://paygateglobal.com/v1/page", params=params) */
  paiement_flooz_tmoney_paygate(infosPaiement: InfosPaiement | null): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token c038a374-b987-475a-abf9-5895f3a56b1b'
      }),
      body: infosPaiement
    };
    return this.http.get<Text>(
      "https://paygateglobal.com/v1/page?token="+"c038a374-b987-475a-abf9-5895f3a56b1b&amount="+infosPaiement?.montant+"&description="+infosPaiement?.description+"&identifier="+infosPaiement?.identifierCommande+"&url="+infosPaiement?.urlRedirectApresPaiement+"&phone="+infosPaiement?.phoneClient+"&network=MOOV");
      /*, {
      "token": "c038a374-b987-475a-abf9-5895f3a56b1b",
      "amount" : infosPaiement?.montant,
      "description" : infosPaiement?.description,
      "identifier" : infosPaiement?.identifierCommande,
      "url" : infosPaiement?.urlRedirectApresPaiement,
      "phone" : infosPaiement?.phoneClient,
      "network" : "MOOV"
    });*/
  }


  paiement_flooz(infosPaiement: InfosPaiement | null): Observable<any> {
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
