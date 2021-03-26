import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LaboratoriesRoutingModule } from "./laboratories-routing.module";
import { ComponentsModule } from "app/core/components/components.module";
import { LaboratoriesComponent } from "./laboratories.component";
import { DetailsLaboratoriesPageComponent } from "./pages/details-laboratories-page/details-laboratories-page.component";
import { ListLaboratoriesPageComponent } from "./pages/list-laboratories-page/list-laboratories-page.component";

@NgModule({
  declarations: [
    LaboratoriesComponent,
    DetailsLaboratoriesPageComponent,
    ListLaboratoriesPageComponent,
  ],
  imports: [CommonModule, LaboratoriesRoutingModule, ComponentsModule],
})
export class LaboratoriesModule {}
