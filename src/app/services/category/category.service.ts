import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/models/Categorie';
import { Produit } from 'src/app/models/Produit';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DaoService<Categorie> {

  constructor(http: HttpClient) {
    super(http);
   }

   
   searhProduitByCategory(nomCategorie: string | undefined): Observable<Array<Produit>>{
    return this.http.get<any>(this.url+"recherche-produits-par-categorie/"+nomCategorie+"/");
  }
}
