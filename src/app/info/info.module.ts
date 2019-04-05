import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CardModule } from "primeng/card";

import { SharedInfoCardModule } from "src/shared/info-card/shared-info-card.module";

import { InfoComponent } from "./info.component";
import { RouterModule } from '@angular/router';

// Angular Libs

@NgModule({
  declarations: [
    InfoComponent
  ],
  exports: [
    InfoComponent
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNG
    CardModule,

    // Our app
    SharedInfoCardModule,
  ],
  providers: [],
  bootstrap: [],
})
export class InfoModule { }
