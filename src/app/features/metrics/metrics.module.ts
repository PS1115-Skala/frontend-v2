import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MetricsRoutingModule } from "./metrics-routing.module";
import { RoomStatsComponent } from "./pages/room-stats/room-stats.component";
import { MetricsComponent } from "./metrics.component";
import { ComponentsModule } from "app/core/components/components.module";

@NgModule({
  declarations: [RoomStatsComponent, MetricsComponent],
  imports: [CommonModule, MetricsRoutingModule, ComponentsModule],
})
export class MetricsModule {}
