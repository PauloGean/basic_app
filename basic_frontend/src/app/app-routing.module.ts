import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth/auth.guard';
import { UserComponent } from './components/user/user.component';
import { UserChartComponent } from './components/user-chart/user-chart.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'userchart',
    component: UserChartComponent,
    canActivate: [ AuthGuard ]
  },

  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: UserComponent,
    canActivate: [ AuthGuard ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
