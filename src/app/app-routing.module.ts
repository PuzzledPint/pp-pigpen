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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'testAll', component: TestAllComponent },

  // Protected
  { path: 'editor', component: EditorComponent },
  { path: 'webmaster', component: WebmasterComponent,  canActivate: [WebmasterGuard] },
  { path: 'comms', component: CommsComponent },
  { path: 'playtesting', component: PlaytestingComponent },

  // public
  { path: 'info', component: InfoComponent },

  // Catch all
  { path: '**', component: HomeComponent, resolve: {void: NotFoundResolver}}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
