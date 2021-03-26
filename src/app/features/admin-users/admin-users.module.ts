import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminUsersRoutingModule } from "./admin-users-routing.module";
import { ListUsersComponent } from "./pages/list-users/list-users.component";
import { AdminUsersComponent } from "./admin-users.component";
import { ComponentsModule } from "app/core/components/components.module";

@NgModule({
  declarations: [ListUsersComponent, AdminUsersComponent],
  imports: [CommonModule, AdminUsersRoutingModule, ComponentsModule],
})
export class AdminUsersModule {}
