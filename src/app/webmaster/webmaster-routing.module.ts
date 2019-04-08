import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WebmasterComponent } from "./webmaster.component";
import { WebmasterGuard } from "./webmaster.guard";
import { PermissionsComponent } from "./components/permissions.component";
import { WebmasterModule } from "./webmaster.module";
import { WebmasterServiceImpl } from './webmaster.service.impl';
import { WebmasterService } from './webmaster.service';

const routes: Routes = [
  {
    path: "", component: WebmasterComponent, canActivate: [WebmasterGuard],
    canActivateChild: [WebmasterGuard], children: [
      { path: "", redirectTo: 'permissions', pathMatch: 'full' },
      { path: "permissions", component: PermissionsComponent },
    ],
  }
];

@NgModule({
  imports: [
    WebmasterModule,
    RouterModule.forChild(routes),
  ],
  providers: [{ provide: WebmasterService, useClass: WebmasterServiceImpl }],
})
export class WebmasterRoutingModule { }
