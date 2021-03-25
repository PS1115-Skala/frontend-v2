import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { AuthComponent } from "./features/auth/auth.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        loadChildren: "./features/dashboard/dashboard.module#DashboardModule",
      },
    ],
  },
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "",
        loadChildren: "./features/auth/auth.module#AuthModule",
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
