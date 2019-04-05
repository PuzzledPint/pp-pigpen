import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CityOpsGuard } from "./city-ops.guard";
import { CityOpsModule } from './city-ops.module';
import { CityOpsComponent } from './city-ops.component';
import { RosterComponent } from './components/roster.component';
import { CitiesComponent } from './components/cities.component';

const routes: Routes = [
  {
    path: "", component: CityOpsComponent, canActivate: [CityOpsGuard],
    canActivateChild: [CityOpsGuard], children: [
      { path: "", redirectTo: 'roster', pathMatch: 'full' },
      { path: "roster", component: RosterComponent },
      { path: "cities", component: CitiesComponent }
    ],
  },
];

@NgModule({
  imports: [CityOpsModule, RouterModule.forChild(routes)],
})

export class CityOpsRoutingModule { }
