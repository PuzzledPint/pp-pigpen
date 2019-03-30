import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TestAllComponent } from './test-all.component';

const routes: Routes = [
  {
    path: "",
    component: TestAllComponent,
//    resolve: {
//      preloadScripts: ScriptLoaderResolver
//    },
//    data: {
//      preloadScripts: ["quill"]
//    },
//    canActivate: [EditorGuard],
//    canActivateChild: [EditorGuard],
//    children: [
//      { path: ":slug", component: TestAllComponent },
//    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestAllRoutingModule { }
