import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RejectionData } from '../../models/rejection-data';

@Component({
  selector: 'rejection-modal',
  templateUrl: './rejection-modal.component.html'
})
export class RejectionModal implements OnInit {
  rejectionForm;

  constructor(
    public dialogRef: MatDialogRef<RejectionModal>,
    @Inject(MAT_DIALOG_DATA) public data: RejectionData
  ) { }

  initRejectionForm(){
      this.rejectionForm = new FormGroup({
          reason: new FormControl('',[
              Validators.required
          ])
      });
  }

  ngOnInit() {
      this.initRejectionForm();
  }

  onSubmit(){
    if (this.rejectionForm.valid) {
      this.data.reason = this.reason.value;
      this.dialogRef.close(true);
    }
  }

  close() {
    this.dialogRef.close();
  }

  get reason() { return this.rejectionForm.get('reason'); }
}
