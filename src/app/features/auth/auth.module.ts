import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import {
  DialogErrorLogin,
  LoginComponent,
} from "./pages/login/login.component";
import { RecoverPasswordComponent } from "./pages/recover-password/recover-password.component";
import {
  DialogSignUp,
  SignUpComponent,
} from "./pages/sign-up/sign-up.component";
import { SignupnewpasswordComponent } from "./pages/signupnewpassword/signupnewpassword.component";
import { AuthRoutes } from "./auth.routing.module";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RecoverPasswordComponent,
    SignUpComponent,
    SignupnewpasswordComponent,
    DialogErrorLogin,
    DialogSignUp,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthRoutes),
    MatDialogModule,
  ],
})
export class AuthModule {}
