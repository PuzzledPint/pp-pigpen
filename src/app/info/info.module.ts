import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CardModule } from "primeng/card";

import { SharedInfoCardModule } from "src/shared/info-card/shared-info-card.module";

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
    CardModule,

    // Our app
    SharedInfoCardModule,
    InfoRoutingModule,
  ],
  providers: [],
  bootstrap: [],
})
export class InfoModule {}
