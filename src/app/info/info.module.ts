import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { InfoComponent } from "./info.component";
import { InfoRoutingModule } from "./info-routing.module";

// Angular Libs

@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    // Angular
    CommonModule,

    // PrimeNG

    // Our app
    InfoRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class InfoModule {}
