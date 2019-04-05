import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TestAllComponent } from './test-all.component';
import { TestAllModule } from './test-all.module';

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
  imports: [TestAllModule, RouterModule.forChild(routes)],
})
export class TestAllRoutingModule { }
