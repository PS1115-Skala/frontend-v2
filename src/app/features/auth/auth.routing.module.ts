import { Routes } from "@angular/router";
import { SignuplayoutComponent } from "./components/signuplayout/signuplayout.component";
import { LoginComponent } from "./pages/login/login.component";
import { RecoverPasswordComponent } from "./pages/recover-password/recover-password.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { SignupnewpasswordComponent } from "./pages/signupnewpassword/signupnewpassword.component";

export const AuthRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "recover-password", component: RecoverPasswordComponent },
  {
    path: "signup",
    component: SignuplayoutComponent,
    children: [
      {
        path: "",
        component: SignUpComponent,
      },
      { path: "verify-password", component: SignupnewpasswordComponent },
    ],
  },
];
