import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RequestsRoutingModule } from "./requests-routing.module";
import { RequestsComponent } from "./requests.component";
import { RequestsPageComponent } from "./pages/requests-page/requests-page.component";
import { ComponentsModule } from "app/core/components/components.module";
import { UserTypePipe } from './pipes/user-type.pipe';
import { RequestStatusPipe } from './pipes/request-status.pipe';
import { ScheduleModal } from './components/schedule/schedule-modal.component';
import { ViewReasonModal } from './components/rejected/view-reason.component';
import { RejectionModal } from './components/rejected/rejection-modal.component';

@NgModule({
  declarations: [RequestsComponent, RequestsPageComponent, UserTypePipe, RequestStatusPipe, ScheduleModal, ViewReasonModal, RejectionModal],
  imports: [CommonModule, RequestsRoutingModule, ComponentsModule, FormsModule, ReactiveFormsModule],
})
export class RequestsModule {}
