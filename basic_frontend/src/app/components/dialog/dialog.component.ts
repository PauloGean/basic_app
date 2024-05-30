import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public description = 'Deseja continuar a operação';
  public title = 'Confirme';
  public btOk = 'Deletar';
  public btCancel = 'Cancelar';
  public subTitle = '';

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    if (this.data.description) {
      this.description = this.data.description;
    }

    if (this.data.title) {
      this.title = this.data.title;
    }

  }

  public closeDialog(): void {
    this.dialogRef.close(false);
  }

}
