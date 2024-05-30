import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth/auth.guard';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserChartComponent } from './components/user-chart/user-chart.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'user/:id', component: UserEditComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'userchart',
    component: HomeComponent,
    canActivate: [ AuthGuard ]
  },

  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuard ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
