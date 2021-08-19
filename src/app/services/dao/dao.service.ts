import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotifierService } from 'angular-notifier';

//import * as $ from 'jquery';
import 'bootstrap-notify';
//declare var $:JQueryStatic;
declare var $:any;

@Injectable({
    providedIn: 'root'
  })
export class DaoService<T> {
  //private notifier: NotifierService;

    protected liste: Array<T> = Array<T>();
    url: string;
    BASE_URL: string = environment.APIEndpoint;
    public objectSubject = new Subject<T[]>();
    constructor(protected http: HttpClient) {
        const APIEndpoint = environment.APIEndpoint;
        this.url = APIEndpoint + '/api/';
    }
    getAll(url: string): Observable<Array<T>>{
        return this.http.get<Array<T>>(this.url + url);
    }
    addT(url: string, t: T | undefined):  Observable<T>{
        return this.http.post<T>(this.url + url, t);
    }
    deletT(url: string, t?: T | undefined){
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          bodey: t
        };
        return this.http.delete(this.url + url, options);
    }
    modifyT(url: string, t: T | undefined): Observable<T>{
        return this.http.put<T>(this.url + url, t);
    }

    get(url: string, id: number): Observable<T>{
        return this.http.get<T>(this.url + url + id + "/");
    }

    notificationAjouter(message: string, type: string ="success"){
    
        /* $.notify({
          message: "message",
          
        },
        {
          animate: {
            enter: "animated bounceInRight",
            exit: "animated bounceOutRight"
    
          },
          timer: 10000,
          delay: 10000,
          type: type
        }); */

        $.notify(message, type);

        //this.notifier.notify(type, message);
    }



}