import { Routes } from "@angular/router";
import { ListRoomsComponent } from "./pages/list-rooms/list-rooms.component";
import { RoomAdminComponent } from "./pages/room-admin/room-admin.component";
import { RoomDetailsComponent } from "./pages/room-details/room-details.component";
import { RoomReservationComponent } from "./pages/room-reservation/room-reservation.component";
import { RoomScheduleComponent } from "./pages/room-schedule/room-schedule.component";

export const DashboardRoutes: Routes = [
  { path: "list-rooms", component: ListRoomsComponent },
  { path: "rooms-details/:roomId", component: RoomDetailsComponent },
  { path: "room-reservation/:roomId", component: RoomReservationComponent },
  { path: "room-schedule/:roomId", component: RoomScheduleComponent },
  { path: "rooms-admin/:roomId", component: RoomAdminComponent },
];
