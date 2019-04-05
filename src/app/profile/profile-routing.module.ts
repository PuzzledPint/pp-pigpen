import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from './profile.component';
import { ProfileModule } from './profile.module';

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
//    resolve: {
//      preloadScripts: ScriptLoaderResolver
//    },
//    data: {
//      preloadScripts: ["quill"]
//    },
//    canActivate: [EditorGuard],
//    canActivateChild: [EditorGuard],
    children: [
      { path: ":slug", component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [ProfileModule, RouterModule.forChild(routes)],
})
export class ProfileRoutingModule { }
