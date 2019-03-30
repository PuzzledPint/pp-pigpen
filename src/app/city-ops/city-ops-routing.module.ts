import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CityOpsGuard } from "./city-ops.guard";
import { RosterComponent } from "./components/roster.component";
import { CitiesComponent } from "./components/cities.component";
import { CityOpsComponent } from "./city-ops.component";

const routes: Routes = [
  {
    path: "",
    component: CityOpsComponent,
    canActivate: [CityOpsGuard],
    canActivateChild: [CityOpsGuard],
    children: [
      { path: "roster", component: RosterComponent },
      { path: "cities", component: CitiesComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityOpsRoutingModule {}
