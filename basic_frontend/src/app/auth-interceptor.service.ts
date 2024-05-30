
import { Injectable } from '@angular/core';
import {  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserAuth } from './services/auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public getUserAuth(): UserAuth{
    var user = JSON.parse(localStorage.getItem('user_auth'));
    if (user){
      user.token_expires = new Date(user.exp * 1000);
    }
    return user;
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userAuth:UserAuth = this.getUserAuth();

    if (userAuth) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(userAuth.token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}