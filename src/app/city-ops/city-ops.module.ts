// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

// PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';

// Our Components
import { RosterComponent } from "./roster.component";
import { CitiesComponent } from './cities.component';
import { CityOpsRoutingModule } from "./city-ops-routing.module";
import { CityOpsComponent } from "./city-ops.component";


@NgModule({
  declarations: [
    CityOpsComponent,
    RosterComponent,
    CitiesComponent,
  ],
  imports: [
    // Angular
    CommonModule,

    // PrimeNG
    TabMenuModule,

    // Our app
    CityOpsRoutingModule,
  ],
  providers: [],
  bootstrap: []
})
export class CityOpsModule {}
