import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoomsRoutingModule } from "./admin-rooms-routing.module";
import { AdminRoomsComponent } from "./admin-rooms.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { ComponentsModule } from "app/core/components/components.module";
import { RequestStatusPipe } from "./pipes/request-status.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AdminRoomsComponent, AdminComponent, RequestStatusPipe],
  imports: [CommonModule, AdminRoomsRoutingModule, ComponentsModule, FormsModule, ReactiveFormsModule],
})
export class AdminRoomsModule {}
