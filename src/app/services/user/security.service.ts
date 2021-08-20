import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserToken } from 'src/app/models/UserToken';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService  extends DaoService<User> {

  constructor(http: HttpClient) {
    super(http);
  }

  register(user: User): Observable<UserToken> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: user
    };
    return this.http.post(this.url + "auth/registrer/", user, options);
}

login(user: User): Observable<UserToken> {
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: user
  };
  return this.http.post(this.url + "auth/connecter/", user, options);
}

logout(token: string | null): Observable<any> {
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+token
    }),
    body: token
  };
  return this.http.post(this.url + "auth/logout/",token, options);
}

user(token: string | null): Observable<User> {
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+token
    }),
    body: token
  };
  return this.http.get<User>(this.url + "auth/user/", options);
}

loggedIn(){
  return !!localStorage.getItem('token');
}

getToken(){
  return localStorage.getItem('token');
}




send_email_reset_password_view(email: string): Observable<any>{
  return this.http.get<any>(this.url + "auth/send_email_reset_password_view/" + email + "/");
}


reset_password(passord1: string, password2: string, uidb64: string, token: string): Observable<any>{
  return this.http.get<any>(this.url + "auth/reset_password/" + passord1 + "/" + password2 + "/" + uidb64 + "/" + token + "/");
}


}
