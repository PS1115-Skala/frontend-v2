import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "view-reason",
    templateUrl: "./view-reason.component.html"
})
export class ViewReasonModal implements OnInit{
    constructor(
        private dialogRef: MatDialogRef<ViewReasonModal>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
    }

    close() {
      this.dialogRef.close();
    }
}