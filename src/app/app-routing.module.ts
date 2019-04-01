import { NgModule, isDevMode } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityOpsGuard } from "./city-ops/city-ops.guard";
import { CommsGuard } from './comms/comms.guard';
import { EditorGuard } from './editor/editor.guard';
import { ShowrunnerGuard } from './showrunner/showrunner.guard';
import { WebmasterGuard } from './webmaster/webmaster.guard';
import { HomeComponent } from 'src/shared/root/home.component';
import { NotFoundResolver } from 'src/services/not-found.resolver';

const routes: Routes = [
  // Home
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // Protected
  { path: 'city-ops', loadChildren:'./city-ops/city-ops.module#CityOpsModule', canLoad: [CityOpsGuard]},
  { path: 'comms', loadChildren:'./comms/comms.module#CommsModule', canLoad: [CommsGuard]},
  { path: 'editor', loadChildren:'./editor/editor.module#EditorModule', canLoad: [EditorGuard]},
  { path: 'showrunner', loadChildren:'./showrunner/showrunner.module#ShowrunnerModule', canLoad: [ShowrunnerGuard]},
  { path: 'webmaster', loadChildren:'./webmaster/webmaster.module#WebmasterModule', canLoad: [WebmasterGuard]},

  // public
  { path: 'playtesting', loadChildren:'./playtesting/playtesting.module#PlaytestingModule'},
  { path: 'donations', loadChildren:'./donations/donations.module#DonationsModule'},
  { path: 'info', loadChildren:'./info/info.module#InfoModule'},

  // public as tester doesn't log in
  { path: 'test-all', loadChildren:'./test-all/test-all.module#TestAllModule'},

  // profile
  { path: 'profile', loadChildren:'./profile/profile.module#ProfileModule'},

  // Catch all
  { path: '**', component: HomeComponent, resolve: {void: NotFoundResolver}}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: isDevMode() })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
