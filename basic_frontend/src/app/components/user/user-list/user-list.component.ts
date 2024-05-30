import { SelectionModel } from '@angular/cdk/collections';
import { Component,  ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  public userList:User[];

  public displayedColumns: string[] = ['email', 'first_name', 'last_name','is_active','is_superuser','actions'];
  public selection = new SelectionModel<User>(true, []);
  public dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator, {static: true})
  public paginator: MatPaginator;
  wsFileLog: Subscription;


  constructor(
    private service:UserService,
    private toastr: ToastrService,
    public dialog: MatDialog
  
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

  public delete(entity: User): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'data') {
        this.service.delete(entity.id).subscribe(
          (response) => {
            this.toastr.success("Usuario removido com sucesso");
             this.search();
          },
          ex => {
          });
      }
    });
  }

}
