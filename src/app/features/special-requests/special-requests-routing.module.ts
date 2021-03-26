import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SpeacialRequestsListComponent } from "./pages/speacial-requests-list/speacial-requests-list.component";

const routes: Routes = [
  { path: "list", component: SpeacialRequestsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialRequestsRoutingModule {}
