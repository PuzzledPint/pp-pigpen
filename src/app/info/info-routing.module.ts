import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InfoComponent } from './info.component';
import { InfoModule } from './info.module';

const routes: Routes = [
  { path: "", component: InfoComponent },
  { path: ":slug", component: InfoComponent },
//    resolve: {
//      preloadScripts: ScriptLoaderResolver
//    },
//    data: {
//      preloadScripts: ["quill"]
//    },
//    canActivate: [EditorGuard],
//    canActivateChild: [EditorGuard],
    // children: [
    //   { path: ":slug", component: InfoComponent },
    // ],
];

@NgModule({
  imports: [InfoModule, RouterModule.forChild(routes)],
})
export class InfoRoutingModule { }
