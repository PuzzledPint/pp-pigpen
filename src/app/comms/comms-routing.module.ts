import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommsComponent } from './comms.component';
import { CommsGuard } from './comms.guard';
import { CommsModule } from './comms.module';
import { ScriptLoaderResolver } from 'src/shared/root/scriptLoader.resolver';

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
