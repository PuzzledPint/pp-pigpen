import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WebmasterComponent } from "./webmaster.component";

const routes: Routes = [
  { path: "", component: WebmasterComponent },
  { path: ":tab", component: WebmasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebmasterRoutingModule {}
