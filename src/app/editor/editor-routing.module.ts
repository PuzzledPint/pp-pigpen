import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditorComponent } from './editor.component';
import { EditorGuard } from './editor.guard';
import { EditorModule } from './editor.module';

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
  imports: [EditorModule, RouterModule.forChild(routes)],
})
export class EditorRoutingModule { }
