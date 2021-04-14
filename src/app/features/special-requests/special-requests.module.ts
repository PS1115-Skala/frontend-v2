import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SpecialRequestsRoutingModule } from "./special-requests-routing.module";
import { SpecialRequestsComponent } from "./special-requests.component";
import { ComponentsModule } from "app/core/components/components.module";
import { SpecialRequestsListComponent } from './pages/special-requests-list/special-requests-list.component';
import { SpecialRequestsFormComponent } from './components/special-requests-form/special-requests-form.component';
import { SpecialRequestsAddComponent } from './pages/special-requests-add/special-requests-add.component';
import { SpecialRequestsFormModalComponent } from "./modals/special-requests-form-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DeleteAsignationModalComponent } from "./modals/delete-asignation-modal.component";

@NgModule({
  declarations: [
    SpecialRequestsComponent, 
    SpecialRequestsListComponent, 
    SpecialRequestsFormComponent, 
    SpecialRequestsAddComponent, 
    SpecialRequestsFormModalComponent,
    DeleteAsignationModalComponent,
  ],
  imports: [
    CommonModule, 
    SpecialRequestsRoutingModule, 
    ComponentsModule, 
    FormsModule, 
    ReactiveFormsModule,
  ],
})
export class SpecialRequestsModule {}
