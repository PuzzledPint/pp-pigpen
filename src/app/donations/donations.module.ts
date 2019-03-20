// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { FormsModule } from "@angular/forms";

// PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';
import { MakeDonationComponent } from "./make-donation.component";
import { ListDonationsComponent } from "./list-donations.component";
import { DonationsRoutingModule } from "./donations-routing.module";
import { DonationsComponent } from "./donations.component";

// Our Components


@NgModule({
  declarations: [
    MakeDonationComponent,
    ListDonationsComponent,
    DonationsComponent
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,

    // Firebase
    AngularFireFunctionsModule,

    // PrimeNG
    TabMenuModule,

    // Our app
    DonationsRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class DonationsModule {}
