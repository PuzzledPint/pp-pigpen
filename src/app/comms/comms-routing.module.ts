import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommsComponent } from './comms.component';
import { ScriptLoaderResolver } from 'src/services/scriptLoader.resolver';
import { CommsGuard } from './comms.guard';
import { CommsModule } from './comms.module';

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
    canActivate: [CommsGuard],
//    canActivateChild: [CommsGuard],
//    children: [
//      { path: "make", component: MakeDonationComponent },
//      { path: "list", component: ListDonationsComponent }
//    ],
  },
];

@NgModule({
  imports: [CommsModule, RouterModule.forChild(routes)],
})
export class CommsRoutingModule { }
