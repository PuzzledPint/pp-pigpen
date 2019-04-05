// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

// PrimeNG

// Our Components
import { ShowrunnerComponent } from './showrunner.component';

@NgModule({
  declarations: [
    ShowrunnerComponent
  ],
  exports: [ShowrunnerComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNG
  ],
  providers: [],
  bootstrap: []
})
export class ShowrunnerModule { }
