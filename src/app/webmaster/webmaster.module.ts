// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Our Components
import { WebmasterComponent } from './webmaster.component';
import { WebmasterRoutingModule } from './webmaster-routing.module';
import { PermissionsComponent } from "./components/permissions.component";

// PrimeNG
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    WebmasterComponent,
    PermissionsComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,

    // PrimeNG
    TabViewModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,

    // Our app
    WebmasterRoutingModule
  ],
  exports: [
    PermissionsComponent
  ],
  providers: [],
  bootstrap: []
})
export class WebmasterModule {}
