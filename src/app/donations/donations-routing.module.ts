import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListDonationsComponent } from "./components/list-donations.component";
import { MakeDonationComponent } from "./components/make-donation.component";
import { DonationsComponent } from './donations.component';
import { ScriptLoaderResolver } from 'src/services/scriptLoader.resolver';

const routes: Routes = [
  {
    path: "",
    component: DonationsComponent,
    resolve: {
      preloadScripts: ScriptLoaderResolver
    },
    data: {
      preloadScripts: ["stripe"]
    },
    children: [
      { path: "make", component: MakeDonationComponent },
      { path: "list", component: ListDonationsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationsRoutingModule { }
