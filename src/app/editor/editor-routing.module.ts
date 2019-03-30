import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditorComponent } from './editor.component';
import { EditorGuard } from './editor.guard';

const routes: Routes = [
  {
    path: "",
    component: EditorComponent,
//    resolve: {
//      preloadScripts: ScriptLoaderResolver
//    },
//    data: {
//      preloadScripts: ["quill"]
//    },
    canActivate: [EditorGuard],
//    canActivateChild: [EditorGuard],
//    children: [
//      { path: "make", component: MakeDonationComponent },
//      { path: "list", component: ListDonationsComponent }
//    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule { }
