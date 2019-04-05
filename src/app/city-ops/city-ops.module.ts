// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

// PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';

// Our Components
import { CityOpsComponent } from "./city-ops.component";
import { RosterComponent } from "./components/roster.component";
import { CitiesComponent } from './components/cities.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    CityOpsComponent,
    RosterComponent,
    CitiesComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNG
    TabMenuModule,
  ],
  exports: [
    CityOpsComponent,
    RosterComponent,
    CitiesComponent
  ],
  providers: [],
  bootstrap: []
})
export class CityOpsModule {}
