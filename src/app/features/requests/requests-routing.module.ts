import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RequestsPageComponent } from "./pages/requests-page/requests-page.component";

const routes: Routes = [{ path: "all", component: RequestsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
