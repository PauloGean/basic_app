import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  public canActivate(): boolean{
    if (this._authService.isAuthenticated()) {
      this._authService.refreshToken();
      return true;
    }else{
      this._router.navigate(['login']);
      return false;
    }
 }

}
