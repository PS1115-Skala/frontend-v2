import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailsLaboratoriesPageComponent } from "./pages/details-laboratories-page/details-laboratories-page.component";
import { ListLaboratoriesPageComponent } from "./pages/list-laboratories-page/list-laboratories-page.component";

const routes: Routes = [
  { path: "all", component: ListLaboratoriesPageComponent },
  { path: "details/:id", component: DetailsLaboratoriesPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoriesRoutingModule {}
