import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService extends DaoService<Fournisseur> {

  constructor(http: HttpClient) {
    super(http);
   }
}
