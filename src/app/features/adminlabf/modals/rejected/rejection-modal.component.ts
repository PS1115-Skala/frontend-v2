import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminlabfService } from "../../services/adminlabf.service";
import { RejectionData } from '../../models/rejectiondata';
declare var $: any;

@Component({
  selector: 'rejection-modal',
  templateUrl: './rejection-modal.component.html'
})

export class RejectionModal implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RejectionModal>,
    private adminlabfService :AdminlabfService,
    @Inject(MAT_DIALOG_DATA) public data: RejectionData,
  ) { }

  ngOnInit() {
      
  }
  reject() {
    this.adminlabfService.putRoomRequests(this.data.id, 'R').subscribe((response) => {
      this.successNotify(response.message);
      this.dialogRef.close(true);
    },
    (error) => {
      this.errorNotify('Hubo un error al procesar esta acción');
      this.dialogRef.close(false);
    });
  }

  close(refresh) {
    this.dialogRef.close(refresh);
  }
  
  successNotify(message) {
    $.notify(
      {
        icon: "check",
        message: message,
      },
      {
        type: "success",
        timer: 5000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }
  
  errorNotify(message) {
    $.notify(
      {
        icon: "close",
        message: message,
      },
      {
        type: "danger",
        timer: 5000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }
}