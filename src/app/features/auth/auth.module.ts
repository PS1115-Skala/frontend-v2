import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import {
  DialogErrorLogin,
  LoginComponent,
  DialogRecoverPassword,
} from "./pages/login/login.component";
import { DialogErrorRecoverPassword,DialogSuccessRecoverPassword,RecoverPasswordComponent } from "./pages/recover-password/recover-password.component";
import {
  DialogSignUp,
  SignUpComponent,
} from "./pages/sign-up/sign-up.component";
import { DialogSuccessSignUp,SignupnewpasswordComponent } from "./pages/signupnewpassword/signupnewpassword.component";
import { AuthRoutes } from "./auth.routing.module";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { SignuplayoutComponent } from './components/signuplayout/signuplayout.component';
import { DialogSuccessRecoverNewPassword,RecoverNewPasswordComponent } from "./pages/recover-newpassword/recover-newpassword.component";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RecoverPasswordComponent,
    SignUpComponent,
    SignupnewpasswordComponent,
    RecoverNewPasswordComponent,
    DialogErrorLogin,
    DialogSignUp,
    SignuplayoutComponent,
    DialogErrorRecoverPassword,
    DialogSuccessRecoverPassword,
    DialogSuccessRecoverNewPassword,
    DialogSuccessSignUp,
    DialogRecoverPassword,
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
