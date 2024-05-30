import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { UserReport } from '../models/user-report.model';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User>{

  constructor(http: HttpClient) {
    super(http , 'users/');
   }

   public report(): Observable<Array<UserReport>> {

    const url= `${this.baseUrl}report_user/`
    return this.http.get<Array<UserReport>> (url);
  }

}
