// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

// Our Components
import { PlaytestingComponent } from './playtesting.component';
import { PlaytestingRoutingModule } from './playtesting-routing.module';

@NgModule({
  declarations: [
    PlaytestingComponent
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,

    // PrimeNG
    ToolbarModule,
    ButtonModule,
    InputTextModule,

    // Our app
    PlaytestingRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class PlaytestingModule {}
