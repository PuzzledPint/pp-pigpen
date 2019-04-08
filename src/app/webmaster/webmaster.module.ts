// Angular Libs
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Our Components
import { WebmasterComponent } from './webmaster.component';
import { PermissionsComponent } from "./components/permissions.component";

// PrimeNG
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { TabMenuModule } from 'primeng/tabmenu';
import { WebmasterService } from "./webmaster.service";
import { WebmasterServiceImpl } from "./webmaster.service.impl";

@NgModule({
  declarations: [
    WebmasterComponent,
    PermissionsComponent,
  ],
  exports: [
    WebmasterComponent,
    PermissionsComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    RouterModule,

    // PrimeNG
    TabMenuModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
  ],
  bootstrap: []
})
export class WebmasterModule {}
