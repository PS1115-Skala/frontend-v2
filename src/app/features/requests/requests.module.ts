import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RequestsRoutingModule } from "./requests-routing.module";
import { RequestsComponent } from "./requests.component";
import { RequestsPageComponent } from "./pages/requests-page/requests-page.component";
import { ComponentsModule } from "app/core/components/components.module";

@NgModule({
  declarations: [RequestsComponent, RequestsPageComponent],
  imports: [CommonModule, RequestsRoutingModule, ComponentsModule],
})
export class RequestsModule {}
