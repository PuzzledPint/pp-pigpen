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
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';

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
    ButtonModule,
    CardModule,
    PanelModule,
    InputTextModule,
    ProgressBarModule,

    // Our app
    DonationsRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class DonationsModule {}
