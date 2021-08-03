import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/models/Produit';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DaoService< Produit> {

  constructor(http: HttpClient) {
    super(http);
   }

   searhProduit(nomProduit: string | undefined): Observable<Array<Produit>>{
    return this.http.get<any>(this.url+"recherche-produits/"+nomProduit+"/");
  }

}
