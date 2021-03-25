import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signupnewpassword",
  templateUrl: "./signupnewpassword.component.html",
  styleUrls: ["./signupnewpassword.component.css"],
})
export class SignupnewpasswordComponent implements OnInit {
  public form: FormGroup;
  public nombre: string;
  public correo: string;
  public tipo: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private LoadingBar: LoadingBarService
  ) {
    try {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation.extras.state as { example: string[2] };
      this.nombre = state.example[0];
      this.correo = state.example[1];
      this.tipo = state.example[2];
    } catch (err) {
      this.router.navigate(["auth/signup"]);
    }
  }

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
    this.LoadingBar.start();
    if (this.form.valid) {
      this.authService
        .signUp(
          this.correo,
          this.form.value.clave,
          this.form.value.confirma_clave
        )
        .subscribe(
          () => {
            this.LoadingBar.stop();
            this.router.navigate(["auth/login"]);
          },
          (error) => {
            // Hacer Modal de error
            alert(error.error.error);
            this.LoadingBar.stop();
          }
        );
    }
  }
}
