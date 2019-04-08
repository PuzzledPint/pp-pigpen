import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityOpsGuard } from "./city-ops/city-ops.guard";
import { CommsGuard } from './comms/comms.guard';
import { EditorGuard } from './editor/editor.guard';
import { ShowrunnerGuard } from './showrunner/showrunner.guard';
import { WebmasterGuard } from './webmaster/webmaster.guard';
import { HomeComponent } from 'src/shared/root/home.component';
import { NotFoundResolver } from 'src/shared/root/not-found.resolver';

const routes: Routes = [
  // Home
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // Protected
  { path: 'city-ops', loadChildren:'./city-ops/city-ops-routing.module#CityOpsRoutingModule', canLoad: [CityOpsGuard]},
  { path: 'comms', loadChildren:'./comms/comms-routing.module#CommsRoutingModule', canLoad: [CommsGuard]},
  { path: 'editor', loadChildren:'./editor/editor-routing.module#EditorRoutingModule', canLoad: [EditorGuard]},
  { path: 'showrunner', loadChildren:'./showrunner/showrunner-routing.module#ShowrunnerRoutingModule', canLoad: [ShowrunnerGuard]},
  { path: 'webmaster', loadChildren:'./webmaster/webmaster-routing.module#WebmasterRoutingModule', canLoad: [WebmasterGuard]},

  // public
  { path: 'playtesting', loadChildren:'./playtesting/playtesting-routing.module#PlaytestingRoutingModule'},
  { path: 'donations', loadChildren:'./donations/donations-routing.module#DonationsRoutingModule'},
  { path: 'info', loadChildren:'./info/info-routing.module#InfoRoutingModule'},

  // public as tester doesn't log in
  { path: 'test-all', loadChildren:'./test-all/test-all-routing.module#TestAllRoutingModule'},

  // profile
  { path: 'profile', loadChildren:'./profile/profile-routing.module#ProfileRoutingModule'},

  // Catch all
  { path: '**', component: HomeComponent, resolve: {void: NotFoundResolver}}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
