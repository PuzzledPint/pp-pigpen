import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TestAllComponent } from "./test-all.component";
import { TestAllRoutingModule } from "./test-all-routing.module";

// Angular Libs

@NgModule({
  declarations: [
    TestAllComponent
  ],
  imports: [
    // Angular
    CommonModule,

    // PrimeNG

    // Our app
    TestAllRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class TestAllModule {}
