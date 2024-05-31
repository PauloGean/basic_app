import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class UserAuth{
  token:string;
  email:string;
  exp: number;
  orig_iat:number;
  user_id: number;
  username:string;
  token_expires: Date;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  protected protocol: string = location.protocol;
  protected hostname: string = location.hostname;
  public baseUrl='';
  public path='auth'

  // http options used for making API calls
  private httpOptions: any;
  
  // error messages received from the login attempt
  public errors: any = [];

  private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }
 
  constructor(private http: HttpClient,private _router: Router) {
    this.baseUrl=`${this.getUrlApi()}${this.path}`;
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  public getUrlApi(): string {
    return this.protocol.concat('//').concat(this.hostname).concat(environment.apiUrl);
  }
 
  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user: any) {
    const url = `${this.baseUrl}/login/`;
    this.http.post(url, JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
        this._router.navigate(['']);

      },
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    const url = `${this.baseUrl}/refresh-token/`;
    const userAuth=this.getUserAuth();

    this.http.post(url, JSON.stringify({token: userAuth.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
        for (let key in this.errors) {
          let value = this.errors[key];
          if (value=='Signature has expired.'){
            this.logout();
          }
        }
 
      }
    );
  }
 
  public logout() {
    localStorage.setItem('user_auth', null);
    localStorage.setItem('user_admin', null);

    this._authSub$.next(false);
    this._router.navigate(['login']);


  }
 
  private updateData(token) {
    this.errors = [];
    // decode the token to read the username and expiration timestamp
    const token_parts = token.split(/\./);
    const token_decoded: UserAuth = JSON.parse(window.atob(token_parts[1]));
    token_decoded.token =token;
    this.saveUserAuth(token_decoded);
    this._authSub$.next(true);
  }


  public saveUserAuth(token_decoded: UserAuth){
    localStorage.setItem('user_auth', JSON.stringify(token_decoded));
  }

  public saveUserAdmin(isAdmin: boolean){
    localStorage.setItem('user_admin', isAdmin?'true':'false');
  }

  public isUserAdmin(){
    return localStorage.getItem('user_admin')==='true';
  }

  public getUserAuth(): UserAuth{
    var user = JSON.parse(localStorage.getItem('user_auth'));
    if (user){
      user.token_expires = new Date(user.exp * 1000);
    }
    return user;
  }

  public isAuthenticated(): boolean {
    const userAuth = this.getUserAuth();
    return userAuth!=null;
  }
 
}
