import { Component, OnInit } from "@angular/core";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";

@Component({
  selector: "app-dialog-upload-image",
  templateUrl: "./dialog-upload-image.component.html",
  styleUrls: ["./dialog-upload-image.component.css"],
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
  cancelar() {
    this.croppedImage = "";
  }
}
