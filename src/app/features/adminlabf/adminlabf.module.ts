import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminlabfRoutingModule } from "./adminlabf-routing.module";
import { AdminlabfComponent } from "./adminlabf.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { ComponentsModule } from "app/core/components/components.module";

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RejectionModal } from './modals/rejected/rejection-modal.component';

@NgModule({
  declarations: [AdminlabfComponent, AdminComponent, RejectionModal],
  imports: [CommonModule, AdminlabfRoutingModule, ComponentsModule,
            MatDatepickerModule, MatNativeDateModule, FormsModule, ReactiveFormsModule,
            ],
})
export class AdminlabfModule {}