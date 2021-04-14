import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectData } from '../../models/selectData';

@Component({
  selector: 'dialog-specific-week',
  templateUrl: './dialog-specific-week.component.html'
})
export class DialogSpecificWeek implements OnInit {
  specificForm;
  numbers: Array<Number>;
  week: Number;

  constructor(
    public dialogRef: MatDialogRef<DialogSpecificWeek>,
    @Inject(MAT_DIALOG_DATA) public data: SelectData
  ) { this.numbers = Array(12).fill(1).map((x,i)=>i+1); }

  ngOnInit() {
  }

  onSubmit(){
    if (this.week){
        this.data.specificWeek = this.week.toString();
        this.dialogRef.close(true);
    }
  }

  close() {
    this.dialogRef.close();
  }
}