import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommsComponent } from './comms.component';
import { ScriptLoaderResolver } from 'src/services/scriptLoader.resolver';

const routes: Routes = [
  {
    path: "",
    component: CommsComponent,
    resolve: {
      preloadScripts: ScriptLoaderResolver
    },
    data: {
      preloadScripts: ["quill"]
    },
    children: [
//      { path: "make", component: MakeDonationComponent },
//      { path: "list", component: ListDonationsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommsRoutingModule { }
