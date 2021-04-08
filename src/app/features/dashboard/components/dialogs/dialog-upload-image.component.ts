import { Component, OnInit } from "@angular/core";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";

@Component({
  selector: "app-dialog-upload-image",
  template: `
    <h2 mat-dialog-title>Cambiar Imagen</h2>
    <mat-dialog-content>
      <span *ngIf="imageChangedEvent == ''">
        Por favor seleccione un archivo.
      </span>
      <image-cropper
        *ngIf="imageChangedEvent != ''"
        [imageChangedEvent]="imageChangedEvent"
        [maintainAspectRatio]="true"
        [aspectRatio]="4 / 3"
        format="jpg"
        (imageCropped)="imageCropped($event)"
        (imageLoaded)="imageLoaded()"
        (cropperReady)="cropperReady()"
        (loadImageFailed)="loadImageFailed()"
      ></image-cropper>
    </mat-dialog-content>
    <mat-dialog-actions>
      <span class="btn btn-info btn-file">
        Cargar Archivo
        <input
          type="file"
          data-max-size="2048"
          (change)="fileChangeEvent($event)"
        />
      </span>
      <button
        mat-button
        mat-dialog-close
        mat-dialog-close="{{ croppedImage }}"
        class="btn btn-success"
      >
        Aceptar
      </button>
      <button
        mat-button
        mat-dialog-close
        mat-dialog-close="{{ croppedImage }}"
        class="btn btn-danger"
        (click)="cancelar()"
      >
        Cancelar
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .btn-file input[type="file"] {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        cursor: inherit;
        display: block;
      }
    `,
  ],
})
export class DialogUploadImageComponent implements OnInit {
  imageChangedEvent: any = "";
  croppedImage: any = "";
  currentImage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.currentImage = this.data.picture;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  cancelar() {
    this.croppedImage = "";
  }
}
