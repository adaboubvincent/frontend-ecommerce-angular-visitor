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



  paiement_flooz_tmoney_post(
    montant: string, description: string, identifier: string, numero: string, moyen: string
  ): Observable<any> {
    //let infosPaiement = new InfosPaiement("c038a374-b987-475a-abf9-5895f3a56b1b", "25", "97838526", "20202020", "FLOOZ", "");
    /* 
    "auth_token" => "c038a374-b987-475a-abf9-5895f3a56b1b",
                    "amount" => $montant,
                    "description" => $description,
                    "identifier" => $r,
                    "phone_number" => $numero,
                    "network" => $moyen
                    ,
        'Authorization': 'Token '+localStorage.getItem('token')
        {
        auth_token: "c038a374-b987-475a-abf9-5895f3a56b1b",
        amount: "25",
        description: "description",
        identifier: "201002010020100",
        phone_number: "97838526",
        network: "FLOOZ"
      }
    */
   
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(
      "https://paygateglobal.com/api/v1/pay/?auth_token=c038a374-b987-475a-abf9-5895f3a56b1b&amount="+montant+"&identifier="+identifier+"&phone_number="+numero+"&network="+moyen, 
      {
        auth_token: "c038a374-b987-475a-abf9-5895f3a56b1b",
        amount: montant,
        description: description,
        identifier: identifier,
        phone_number: numero,
        network: moyen
      }, options);
  }

  paiement_reference(identifier: string, mode: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage.getItem('token')
      }),
      body: {}
    };
    return this.http.get<any>(this.url + "paiement-reference/"+"?mode="+mode+"&identifier="+identifier, options); 
  }


  verifier_paiement(identifier: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token c038a374-b987-475a-abf9-5895f3a56b1b'
      }),
      body: {identifier: identifier, auth_token: "c038a374-b987-475a-abf9-5895f3a56b1b"}
    };

    /* 
    Nom	                Description
    tx_reference	      Identifiant Unique généré par PayGateGlobal pour la transaction
    payment_reference	  Code de référence de paiement généré par Flooz/TMoney. Ce code peut être utilisé en cas de résolution de problèmes ou de plaintes.
    status	            Code d’état du paiement.
    datetime	          Date et Heure du paiement
    payment_method	    Méthode de paiement utilisée par le client. Valeurs possibles: FLOOZ, T-Money
    
    Les valeurs possibles de l’état de paiement sont:
    0 : Paiement réussi avec succès 2 : En cours 4 : Expiré 6: Annulé
     */
    return this.http.post<any>(
      "https://paygateglobal.com/api/v2/status?auth_token=c038a374-b987-475a-abf9-5895f3a56b1b&identifier"+identifier, 
      {identifier: identifier, auth_token: "c038a374-b987-475a-abf9-5895f3a56b1b"}
    );
      
  }
}
