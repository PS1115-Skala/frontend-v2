import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminlabfRoutingModule } from "./adminlabf-routing.module";
import { AdminlabfComponent } from "./adminlabf.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { ComponentsModule } from "app/core/components/components.module";

@NgModule({
  declarations: [AdminlabfComponent, AdminComponent],
  imports: [CommonModule, AdminlabfRoutingModule, ComponentsModule],
})
export class AdminlabfModule {}
