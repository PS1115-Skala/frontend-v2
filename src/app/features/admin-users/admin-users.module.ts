import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminUsersRoutingModule } from "./admin-users-routing.module";
import { ListUsersComponent } from "./pages/list-users/list-users.component";
import { AdminUsersComponent } from "./admin-users.component";
import { ComponentsModule } from "app/core/components/components.module";
import { DetailUserComponent } from './pages/detail-user/detail-user.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ListUsersComponent, AdminUsersComponent, DetailUserComponent],
  imports: [CommonModule, AdminUsersRoutingModule, ComponentsModule, FormsModule, ReactiveFormsModule],
})
export class AdminUsersModule {}
