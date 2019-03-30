import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowrunnerComponent } from './showrunner.component';

const routes: Routes = [
  {
    path: "",
    component: ShowrunnerComponent,
//     resolve: {
//       preloadScripts: ScriptLoaderResolver
//     },
//     data: {
//       preloadScripts: ["quill"]
//     },
//     children: [
//      { path: "make", component: MakeDonationComponent },
//      { path: "list", component: ListDonationsComponent }
//     ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowrunnerRoutingModule { }
