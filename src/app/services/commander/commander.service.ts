import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/models/Categorie';
import { Text } from 'src/app/models/Text';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class CommanderService extends DaoService<Categorie>{

  constructor(http: HttpClient) {
    super(http);
   }

  commander(token: string | null): Observable<Text> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+token
      }),
      body: token
    };
    return this.http.post<Text>(this.url + "commander/", token, options);
  }

}
