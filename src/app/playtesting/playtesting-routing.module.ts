import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlaytestingComponent } from './playtesting.component';
import { ScriptLoaderResolver } from 'src/shared/root/scriptLoader.resolver';
import { PlaytestingModule } from './playtesting.module';

const routes: Routes = [
  {
    path: "",
    component: PlaytestingComponent,
  },
];

@NgModule({
  imports: [PlaytestingModule, RouterModule.forChild(routes)],
})
export class PlaytestingRoutingModule { }
