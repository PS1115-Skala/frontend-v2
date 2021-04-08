import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListRoomsComponent } from "./pages/list-rooms/list-rooms.component";
import { RouterModule } from "@angular/router";
import { DashboardRoutes } from "./dashboard.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "app/core/components/components.module";
import { DashboardComponent } from "./dashboard.component";
import { RoomDetailsComponent } from "./pages/room-details/room-details.component";
import { RoomReservationComponent } from "./pages/room-reservation/room-reservation.component";
import { RoomAdminComponent } from "./pages/room-admin/room-admin.component";
import { DialogUploadImageComponent } from "./components/dialogs/dialog-upload-image.component";
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  declarations: [
    ListRoomsComponent,
    DashboardComponent,
    RoomDetailsComponent,
    RoomReservationComponent,
    RoomAdminComponent,
    DialogUploadImageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    ImageCropperModule,
  ],
})
export class DashboardModule {}
