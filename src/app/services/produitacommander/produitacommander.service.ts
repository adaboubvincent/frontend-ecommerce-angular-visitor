import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ProduitACommander } from 'src/app/models/ProduitACommander';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitacommanderService  extends DaoService<ProduitACommander> {

  constructor(http: HttpClient) {
    super(http);
   }
}