import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { TestAllComponent } from './test-all/test-all.component';
import { EditorsComponent } from './editors/editors.component';
import { EditorsGuard } from './editors/editors.guard';
import { PlaytestingComponent } from './playtesting/playtesting.component';
import { HomeComponent } from 'src/components/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'testAll', component: TestAllComponent },
  { path: 'editors', component: EditorsComponent,  canActivate: [EditorsGuard] },
  { path: 'playtesting',  component: PlaytestingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
