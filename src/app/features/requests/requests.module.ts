import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RequestsRoutingModule } from "./requests-routing.module";
import { RequestsComponent } from "./requests.component";
import { RequestsPageComponent } from "./pages/requests-page/requests-page.component";
import { ComponentsModule } from "app/core/components/components.module";
import { UserTypePipe } from './pipes/user-type.pipe';
import { RequestStatusPipe } from './pipes/request-status.pipe';
import { ScheduleModal } from './modals/schedule/schedule-modal.component'

@NgModule({
  declarations: [RequestsComponent, RequestsPageComponent, UserTypePipe, RequestStatusPipe, ScheduleModal],
  imports: [CommonModule, RequestsRoutingModule, ComponentsModule],
})
export class RequestsModule {}
