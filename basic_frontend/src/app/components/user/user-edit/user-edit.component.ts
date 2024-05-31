import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-Matedit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  entityForm: User = {} as User;
  form: NgForm;
  isNew = false;
  password='';



  constructor(
    private service: UserService,
    private toastr: ToastrService,
    protected router: Router,
    protected route: ActivatedRoute,
    private authService: AuthService


  ) {

  }

  ngOnInit() {
    this.initViewByParameters();
  }

  public initViewByParameters(): void {
    this.route.params
      .subscribe((value) => {
        const idParaments = +value['id'];
        if (idParaments) {
          this.isNew = false;
          this.retrieveById(idParaments);
        } else {
          this.isNew = true;
        }
      });
  }

  public retrieveById(id: number): void {
    this.service.clearParameter();
    this.service.getById(id).subscribe(
      (response) => {
        this.entityForm = response;

      },
      ex => {
        this.toastr.error("Erro ao conectar ao servidor", ex);
      });
  }
  protected is_valid(entityForm: User): boolean {
    return true;
  }
  public saveOrUpdate(): void {
    if(this.password.trim()!==''){
      this.entityForm.password=this.password;
    }
    if (this.is_valid(this.entityForm)) {
      if (!this.entityForm.id) {
        this.service.save(this.entityForm).subscribe(
          (response) => {
            this.entityForm.id = response.id;
            this.postCreate();
            this.toastr.success("Sucesso", "Salvo com sucesso!");
          },
          ex => {
            this.showError(ex);
          });
      } else {
        this.service.update(this.entityForm.id, this.entityForm).subscribe(
          (response) => {
            this.entityForm.id = response.id;
            this.postUpdate();
            this.toastr.success("Sucesso", "Salvo com sucesso!");
          },
          ex => {
            this.showError(ex);
          });
      }
    }
  }


  public showError(ex) {
    this.toastr.error("Erro salvar usuário", ex);

  }
  public isEditablePassword(){
    return this.authService.isUserAdmin() || this.authService.getUserAuth().user_id==this.entityForm.id;
  }

  public isEditable(){
    return this.authService.isUserAdmin();
  }

  public isEditableStatus(){
    return this.authService.isUserAdmin() && this.authService.getUserAuth().user_id!==this.entityForm.id;
  }


  public postCreate() {
    this.navigateReturnPage();
  }

  public postUpdate() {
    this.navigateReturnPage();
  }


  public navigateReturnPage() {
    this.router.navigate(['/user-list']);
  }

  public cancel() {
    this.navigateReturnPage();
  }


}
