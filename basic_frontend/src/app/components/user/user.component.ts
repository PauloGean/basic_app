import { SelectionModel } from '@angular/cdk/collections';
import { Component,  ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  public userList:User[];

  public displayedColumns: string[] = ['email', 'first_name', 'last_name','is_active','is_superuser'];
  public selection = new SelectionModel<User>(true, []);
  public dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator, {static: true})
  public paginator: MatPaginator;
  wsFileLog: Subscription;

  public varLib="";

  constructor(
    private service:UserService,
    private toastr: ToastrService,
  
  ) {     this.search();

    }


  public search():void{
    this.service.clearParameter();

    this.service.getAll().subscribe(response => {
      this.userList = response;
      this.dataSource = new MatTableDataSource<User>( this.userList);
      this.selection.clear();
    });
  }



}
