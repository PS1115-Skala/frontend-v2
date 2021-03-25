import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, NavigationExtras } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { AuthService } from "../../services/auth.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "dialog-errorLogin",
  templateUrl: "dialog-errorLogin.html",
})
export class DialogErrorLogin {
  constructor(public dialogRef: MatDialogRef<DialogErrorLogin>) {}

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.close();
  }
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../../auth.component.css"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private LoadingBar: LoadingBarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      //usbId: [null, [Validators.required, Validators.pattern("[0-9][0-9]-[0-9]{5}"), Validators.maxLength(8), Validators.minLength(8)]],
      usbId: [null, [Validators.required]],
      clave: [null, [Validators.required]],
      check: false,
    });
  }

  onSubmit(values) {
    if (this.form.valid) {
      this.LoadingBar.start();
      this.authService.login(values.usbId, values.clave).subscribe(
        (loginresponse) => {
          this.LoadingBar.complete();
          if (loginresponse.auth) {
            localStorage.setItem("token", loginresponse.token);
            this.router.navigate(["dashboard/list-rooms"]);
          }
        },
        (error) => {
          this.LoadingBar.complete();
          const dialogRef = this.dialog.open(DialogErrorLogin);
        }
      );
    }
  }
}
