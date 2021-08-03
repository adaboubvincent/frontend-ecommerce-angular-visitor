import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { SecurityService } from '../user/security.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: any, next: any){
    let authService = this.injector.get(SecurityService);
    let tokenizedReq: any;
    if(authService.getToken() === ""){
      tokenizedReq = req.clone({
        setHeaders: {
        }
      });
    }else{
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: 'Token '+authService.getToken()
        }
      });
    }
    
    return next.handle(tokenizedReq);
  }
}
