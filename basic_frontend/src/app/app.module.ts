import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service';
import { CheckIconsComponent } from './components/check-icons/check-icons.component';
import { ToastrModule } from 'ngx-toastr';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserChartComponent } from './components/user-chart/user-chart.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { DialogComponent } from './components/dialog/dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserChartComponent,
    UserListComponent,
    UserEditComponent,
    CheckIconsComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    ToastrModule.forRoot({
      positionClass:'toast-top-right',
      timeOut: 5000,
      progressBar: true,
      tapToDismiss: true,
    }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
