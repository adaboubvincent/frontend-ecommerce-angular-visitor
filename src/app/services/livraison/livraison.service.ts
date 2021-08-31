import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livraison } from 'src/app/models/Livraison';
import { DaoService } from '../dao/dao.service';
//import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService  extends DaoService<Livraison> {

  constructor(http: HttpClient) {
    super(http);
    //, service: NotificationsService service
   }
}
