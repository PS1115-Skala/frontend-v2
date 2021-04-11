import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { AuthComponent } from "./features/auth/auth.component";
import { RequestsComponent } from "./features/requests/requests.component";
import { LaboratoriesComponent } from "./features/laboratories/laboratories.component";
import { SpecialRequestsComponent } from "./features/special-requests/special-requests.component";
import { AdminlabfComponent } from "./features/adminlabf/adminlabf.component";
import { AdminRoomsComponent } from "./features/admin-rooms/admin-rooms.component";
import { AdminUsersComponent } from "./features/admin-users/admin-users.component";
import { BasicauthGuard } from "./core/guards/basicauth.guard";
import { LabFGuard } from "./core/guards/lab-f.guard";
import { AdminLabGuard } from "./core/guards/admin-lab.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [BasicauthGuard],
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
  {
    path: "requests",
    component: RequestsComponent,
    canActivate: [BasicauthGuard],
    children: [
      {
        path: "",
        loadChildren: "./features/requests/requests.module#RequestsModule",
      },
    ],
  },
  {
    path: "laboratories",
    component: LaboratoriesComponent,
    canActivate: [BasicauthGuard],
    children: [
      {
        path: "",
        loadChildren:
          "./features/laboratories/laboratories.module#LaboratoriesModule",
      },
    ],
  },
  {
    path: "special-requests",
    component: SpecialRequestsComponent,
    canActivate: [BasicauthGuard],
    children: [
      {
        path: "",
        loadChildren:
          "./features/special-requests/special-requests.module#SpecialRequestsModule",
      },
    ],
  },
  {
    path: "admin-labf",
    component: AdminlabfComponent,
    canActivate: [BasicauthGuard, LabFGuard],
    children: [
      {
        path: "",
        loadChildren: "./features/adminlabf/adminlabf.module#AdminlabfModule",
      },
    ],
  },
  {
    path: "admin-rooms",
    component: AdminRoomsComponent,
    canActivate: [BasicauthGuard, AdminLabGuard],
    children: [
      {
        path: "",
        loadChildren:
          "./features/admin-rooms/admin-rooms.module#AdminRoomsModule",
      },
    ],
  },
  {
    path: "admin-users",
    component: AdminUsersComponent,
    canActivate: [BasicauthGuard, LabFGuard],
    children: [
      {
        path: "",
        loadChildren:
          "./features/admin-users/admin-users.module#AdminUsersModule",
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
