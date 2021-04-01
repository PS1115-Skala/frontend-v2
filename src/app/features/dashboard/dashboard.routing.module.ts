import { Routes } from "@angular/router";
import { ListRoomsComponent } from "./pages/list-rooms/list-rooms.component";
import { RoomDetailsComponent } from "./pages/room-details/room-details.component";
import { RoomReservationComponent } from "./pages/room-reservation/room-reservation.component";

export const DashboardRoutes: Routes = [
  { path: "list-rooms", component: ListRoomsComponent },
  { path: "rooms-details/:roomId", component: RoomDetailsComponent },
  { path: "room-reservation/:roomId", component: RoomReservationComponent },
];
