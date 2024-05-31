import { Component } from '@angular/core';
import { Subject, takeUntil, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '[APP]';


  public isAuthenticated = false;
  private _destroySub$ = new Subject<void>();

  constructor(private _authService: AuthService,   
    
    private service: UserService,
  ) { }

  public ngOnInit(): void {
    this.isAuthenticated=this._authService.isAuthenticated();

    this._authService.isAuthenticated$.pipe(
      takeUntil(this._destroySub$)
    ).subscribe((isAuthenticated: boolean) => {

      this.isAuthenticated = isAuthenticated
      if(isAuthenticated){
            this.service.getById(this._authService.getUserAuth().user_id).subscribe(
              (response) => {
                this._authService.saveUserAdmin(response.is_superuser);
              },
              ex => {
              });
      }
    });
  }

  public getUser(){
    return this._authService.getUserAuth()?.email;
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public logout(): void {
    this._authService.logout();
  }
}
