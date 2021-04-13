import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'app-dialog-form-reservas-especiales',
    template: 
    `
    <h1 mat-dialog-title>{{title}}</h1>
    <div mat-dialog-content>
        <p *ngIf="message != undefined"> {{message}} </p>
        <div>
            <app-special-requests-form 
                [datos]="datos" 
                [laboratorios]="laboratorios" 
                (formValues)="onCrear($event)">
            </app-special-requests-form>
        </div>
    </div>
    <div mat-dialog-actions align="left">
        <button mat-button (click)="onCancel()">Cancelar</button>
    </div>
    `,
})
export class SpecialRequestsFormModalComponent {
    public title: string;
    public message: string;
    public laboratorios: any[]
    public datos: any;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<SpecialRequestsFormModalComponent>
	) {
        this.dialogRef.disableClose = true;
        this.title = data.title;
        this.message = data.message;
        this.laboratorios = data.laboratorios;
        this.datos = data.datos;
    }

    onCrear(event:any) {
        this.dialogRef.close(event);
    }
    
    onCancel() {
		this.dialogRef.close(-1);
    }

}