import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from "./info-card.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";

// PrimeNG

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ButtonModule,
    CardModule,
  ],
  exports: [
    InfoCardComponent,
  ],
  declarations: [
    InfoCardComponent,
  ]
})
export class SharedInfoCardModule { }
