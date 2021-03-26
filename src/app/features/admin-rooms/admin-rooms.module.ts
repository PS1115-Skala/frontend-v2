import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoomsRoutingModule } from "./admin-rooms-routing.module";
import { AdminRoomsComponent } from "./admin-rooms.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { ComponentsModule } from "app/core/components/components.module";

@NgModule({
  declarations: [AdminRoomsComponent, AdminComponent],
  imports: [CommonModule, AdminRoomsRoutingModule, ComponentsModule],
})
export class AdminRoomsModule {}
