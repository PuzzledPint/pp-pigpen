// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

// PrimeNG

// Our Components
import { WebmasterComponent } from './webmaster.component';
import { WebmasterRoutingModule } from './webmaster-routing.module';

@NgModule({
  declarations: [
    WebmasterComponent
  ],
  imports: [
    // Angular
    CommonModule,

    // PrimeNG

    // Our app
    WebmasterRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class WebmasterModule {}
