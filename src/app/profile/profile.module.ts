import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { CardModule } from "primeng/card";
import { RouterModule } from "@angular/router";

// Angular Libs

@NgModule({
  declarations: [
    ProfileComponent
  ],
  exports: [ProfileComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNG
    CardModule,
  ],
  providers: [],
  bootstrap: []
})
export class ProfileModule {}
