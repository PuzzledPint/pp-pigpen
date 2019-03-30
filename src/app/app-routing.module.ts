import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { TestAllComponent } from './test-all/test-all.component';
import { EditorComponent } from './editor/editor.component';
import { EditorGuard } from './editor/editor.guard';
import { WebmasterComponent } from './webmaster/webmaster.component';
import { WebmasterGuard } from './webmaster/webmaster.guard';
import { PlaytestingComponent } from './playtesting/playtesting.component';
import { HomeComponent } from 'src/components/home.component';
import { NotFoundResolver } from './not-found.resolver';
import { CommsComponent } from './comms/comms.component';
import { CommsGuard } from './comms/comms.guard';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { CityOpsGuard } from "./city-ops/city-ops.guard";

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
  { path: 'profile/:uid', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },

  // Catch all
  { path: '**', component: HomeComponent, resolve: {void: NotFoundResolver}}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
