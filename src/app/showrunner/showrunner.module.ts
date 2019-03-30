// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

// PrimeNG

// Our Components
import { ShowrunnerComponent } from './showrunner.component';
import { ShowrunnerRoutingModule } from './showrunner-routing.module';

@NgModule({
  declarations: [
    ShowrunnerComponent
  ],
  imports: [
    // Angular
    CommonModule,

    // PrimeNG

    // Our app
    ShowrunnerRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class ShowrunnerModule {}
