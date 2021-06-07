import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Image } from 'src/app/models/Image';
import { DaoService } from '../dao/dao.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends DaoService<Image> {

  constructor(http: HttpClient) {
    super(http);
   }

   postImage(id: number | undefined, formData: FormData){
     return this.http.post<any>(this.url+"upload/?id="+id, formData);
   }

   imagesOfProduit(id: number | undefined): Observable<Array<Image>>{
    return this.http.get<any>(this.url+"images-produit/"+id+"/");
  }

  imageOfProduit(id: number | undefined): Observable<Image>{
    return this.http.get<any>(this.url+"image-produit/"+id+"/");
  }
}