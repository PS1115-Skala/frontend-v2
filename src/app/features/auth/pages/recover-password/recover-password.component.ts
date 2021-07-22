import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "dialog-errorRecoverPassword",
  templateUrl: "dialog-errorRecoverPassword.html",
})
export class DialogErrorRecoverPassword {
  constructor(public dialogRef: MatDialogRef<DialogErrorRecoverPassword>) {}

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.close();
  }
}

@Component({
  selector: "dialog-successRecoverPassword",
  templateUrl: "dialog-successRecoverPassword.html",
})
export class DialogSuccessRecoverPassword {
  constructor(public dialogRef: MatDialogRef<DialogSuccessRecoverPassword>) {}

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.close();
  }
}

@Component({
  selector: "app-recover-password",
  templateUrl: "./recover-password.component.html",
  styleUrls: ["./recover-password.component.css"],
})
export class RecoverPasswordComponent implements OnInit {
  public form: FormGroup;
  public datos: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private LoadingBar: LoadingBarService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      //usbId: [null, [Validators.required, Validators.pattern("[0-9][0-9]-[0-9]{5}"), Validators.maxLength(8), Validators.minLength(8)]],
      usbId: [null, [Validators.required]],
      //code: [null, [Validators.required]],
      check: false,
    });
  }

  onSubmit(values) {
    // Colocar servicio para saber si es usuario o no del sistema. arreglar este servicio en el auth.service
    /*if (this.form.valid) {
      this.LoadingBar.start();
      this.authService.getUser(values.usbId).subscribe(
        (User) => {
          this.LoadingBar.complete();
          this.router.navigate(["auth/login"]);
        },
        (error) => {
          this.LoadingBar.complete();
          const dialogRef = this.dialog.open(DialogErrorRecoverPassword);
        }
      );
    }*/
    const dialogRef = this.dialog.open(DialogSuccessRecoverPassword);
    //this.router.navigate(["auth/login"]);
    this.router.navigate(["auth/recover-newpassword"]);
  }
}
