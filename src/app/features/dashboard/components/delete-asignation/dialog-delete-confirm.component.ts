import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-delete-asignation',
  templateUrl: './dialog-delete-confirm.component.html'
})
export class DialogDeleteConfirm {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteConfirm>,
  ) { }

  onSubmit(respuesta: string) {
    this.dialogRef.close(respuesta == 'Si');
  }
}
