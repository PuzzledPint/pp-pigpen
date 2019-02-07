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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'testAll', component: TestAllComponent },
  { path: 'editor', component: EditorComponent,  canActivate: [EditorGuard] },
  { path: 'webmaster', component: WebmasterComponent,  canActivate: [WebmasterGuard] },
  { path: 'playtesting',  component: PlaytestingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
