import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlaytestingComponent } from './playtesting.component';
import { ScriptLoaderResolver } from 'src/services/scriptLoader.resolver';

const routes: Routes = [
  {
    path: "",
    component: PlaytestingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaytestingRoutingModule { }
