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
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [ListRoomsComponent, DashboardComponent, RoomDetailsComponent, RoomReservationComponent, RoomScheduleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatTableModule
  ],
})
export class DashboardModule {}
