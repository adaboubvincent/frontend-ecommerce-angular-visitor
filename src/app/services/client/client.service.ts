import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends DaoService<Client> {

  constructor(http: HttpClient) {
    super(http);
   }

   getClient(): Observable<Client>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage.getItem('token')
      }),
      bodey: localStorage.getItem('token')
    };

    return this.http.get<Client>(this.url+"client/compte/", options);
   }


  
}
