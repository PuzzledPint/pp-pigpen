// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { FormsModule } from "@angular/forms";

// PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';
import { DonationsMakeComponent } from "./components/make.component";
import { DonationsListComponent } from "./components/list.component";
import { DonationsComponent } from "./donations.component";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterModule } from '@angular/router';

// Our Components


@NgModule({
  declarations: [
    DonationsMakeComponent,
    DonationsListComponent,
    DonationsComponent
  ],
  exports: [
    DonationsMakeComponent,
    DonationsListComponent,
    DonationsComponent
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    RouterModule,

    // Firebase
    AngularFireFunctionsModule,

    // PrimeNG
    TabMenuModule,
    ButtonModule,
    CardModule,
    PanelModule,
    InputTextModule,
    ProgressBarModule,
  ],
  providers: [],
  bootstrap: []
})
export class DonationsModule {}
