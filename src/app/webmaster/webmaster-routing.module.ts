import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WebmasterComponent } from './webmaster.component';
import { ScriptLoaderResolver } from 'src/services/scriptLoader.resolver';

const routes: Routes = [
  {
    path: "",
    component: WebmasterComponent,
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
export class WebmasterRoutingModule { }
