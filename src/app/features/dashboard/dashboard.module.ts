import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListRoomsComponent } from "./pages/list-rooms/list-rooms.component";
import { RouterModule } from "@angular/router";
import { DashboardRoutes } from "./dashboard.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "app/core/components/components.module";
import { DashboardComponent } from "./dashboard.component";
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { RoomReservationComponent } from './pages/room-reservation/room-reservation.component';
import { RoomScheduleComponent } from './pages/room-schedule/room-schedule.component';
import { RoomAdminComponent } from "./pages/room-admin/room-admin.component";
import { DeleteAsignationComponent } from "./pages/delete-asignation/delete-asignation.component";
import { DialogUploadImageComponent } from "./components/dialogs/dialog-upload-image.component";
import { MatTableModule } from "@angular/material/table";
import { ImageCropperModule } from "ngx-image-cropper";
import { DialogSpecificWeek } from "./components/delete-asignation/dialog-specific-week.component";
import { DialogDeleteConfirm } from "./components/delete-asignation/dialog-delete-confirm.component";

@NgModule({
  declarations: [
    ListRoomsComponent,
    DashboardComponent,
    RoomDetailsComponent,
    RoomReservationComponent,
    RoomScheduleComponent,
    RoomAdminComponent,
    DeleteAsignationComponent,
    DialogUploadImageComponent,
    DialogSpecificWeek,
    DialogDeleteConfirm
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatTableModule,
    ImageCropperModule,
  ],
})
export class DashboardModule {}
