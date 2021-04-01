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

@NgModule({
  declarations: [ListRoomsComponent, DashboardComponent, RoomDetailsComponent, RoomReservationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class DashboardModule {}
