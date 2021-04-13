import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoomStatsComponent } from "./pages/room-stats/room-stats.component";

const routes: Routes = [{ path: "", component: RoomStatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetricsRoutingModule {}
