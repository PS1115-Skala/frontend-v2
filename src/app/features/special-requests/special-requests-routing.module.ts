import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminOrLabfGuard } from "app/core/guards/admin-or-labf.guard";
import { SpecialRequestsAddComponent } from "./pages/special-requests-add/special-requests-add.component";
import { SpecialRequestsListComponent } from "./pages/special-requests-list/special-requests-list.component";

const routes: Routes = [
  { path: "list", component: SpecialRequestsListComponent, canActivate: [AdminOrLabfGuard] },
  { path: "add", component: SpecialRequestsAddComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialRequestsRoutingModule {}
