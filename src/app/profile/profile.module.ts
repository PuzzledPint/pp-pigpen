import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { CardModule } from "primeng/card";

// Angular Libs

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    // Angular
    CommonModule,

    // PrimeNG
    CardModule,

    // Our app
    ProfileRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class ProfileModule {}
