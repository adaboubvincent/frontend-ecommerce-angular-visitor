import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DaoService } from '../dao/dao.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends DaoService<any> {

  constructor(http: HttpClient) {
    super(http);
   }


   confirmation_email(uidb64: string, token: string): Observable<any>{
    return this.http.get<any>(this.url + "activate/" + uidb64 + "/" + token + "/");
}

}
