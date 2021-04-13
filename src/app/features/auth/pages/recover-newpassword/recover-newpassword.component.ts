import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ValidationErrors } from "@angular/forms";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "dialog-successRecoverNewPassword",
  templateUrl: "dialog-successRecoverNewPassword.html",
})
export class DialogSuccessRecoverNewPassword {
  constructor(public dialogRef: MatDialogRef<DialogSuccessRecoverNewPassword>) {}

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.close();
  }
}

@Component({
  selector: "app-recover-newpassword",
  templateUrl: "./recover-newpassword.component.html",
  styleUrls: ["./recover-newpassword.component.css"],
})
export class RecoverNewPasswordComponent implements OnInit {
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

  validateSamePassword(control: FormGroup): ValidationErrors | null {
    const clave = control.get("clave");
    const confirma_clave = control.get("confirma_clave");
    return clave.value === confirma_clave.value ? null : { noSonIguales: true };
  }

  checkSamePassword(): boolean {
    return (
      this.form.hasError("noSonIguales") &&
      this.form.get("clave").dirty &&
      this.form.get("confirma_clave").dirty
    );
  }

  ngOnInit(): void {
    this.LoadingBar.start();
    this.form = this.formBuilder.group(
      {
        clave: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("[0-9a-zA-Z]*"),
          ],
        ],
        confirma_clave: [null, [Validators.required]],
      },
      {
        validators: this.validateSamePassword,
      }
    );
    this.LoadingBar.complete();
  }

  onSubmit() {
    // Colocar endpoint que actualiza con la nueva contraseña
    const dialogRef = this.dialog.open(DialogSuccessRecoverNewPassword);
    this.router.navigate(["auth/login"]);
  }
}