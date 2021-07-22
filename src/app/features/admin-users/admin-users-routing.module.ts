import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailUserComponent } from "./pages/detail-user/detail-user.component";
import { ListUsersComponent } from "./pages/list-users/list-users.component";

const routes: Routes = [
  {
    path: "",
    component: ListUsersComponent,
  },
  {
    path: "user/:id",
    component: DetailUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersRoutingModule {}
