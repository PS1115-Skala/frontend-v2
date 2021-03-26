import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SpecialRequestsRoutingModule } from "./special-requests-routing.module";
import { SpecialRequestsComponent } from "./special-requests.component";
import { SpeacialRequestsListComponent } from "./pages/speacial-requests-list/speacial-requests-list.component";
import { ComponentsModule } from "app/core/components/components.module";

@NgModule({
  declarations: [SpecialRequestsComponent, SpeacialRequestsListComponent],
  imports: [CommonModule, SpecialRequestsRoutingModule, ComponentsModule],
})
export class SpecialRequestsModule {}
