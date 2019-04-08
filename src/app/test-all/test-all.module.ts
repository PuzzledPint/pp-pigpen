import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

// Our modules
import { TestAllComponent } from "./test-all.component";

// Primeng
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { FormsModule } from '@angular/forms';

// Primeng
import { WebmasterServiceMock } from "./mocks/webmaster.service.mock";
import { WebmasterModule } from "../webmaster/webmaster.module";
import { WebmasterService } from '../webmaster/webmaster.service';

@NgModule({
  declarations: [
    TestAllComponent,
  ],
  exports: [ TestAllComponent ],
  imports: [
    // Angular
    CommonModule,
    ButtonModule,

    // To test
    WebmasterModule
  ],
  providers: [{ provide: WebmasterService, useClass: WebmasterServiceMock }],
  bootstrap: []
})
export class TestAllModule {}
