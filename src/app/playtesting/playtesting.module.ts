// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

// shared
import { SharedPuzzleModule } from '../../components/puzzle/shared-puzzle.module

// Our Components
import { PlaytestingComponent } from './playtesting.component';
import { PlaytestingRoutingModule } from './playtesting-routing.module';
import { PuzzleFeedbackComponent } from "./puzzle-feedback.component";
import { FieldsetModule } from "primeng/fieldset";
import { CheckboxModule } from "primeng/checkbox";
import { RatingModule } from 'primeng/rating';
import { HintComponent } from "./hint.component";
import { PuzzleComponent } from "./puzzle.component";

@NgModule({
  declarations: [
    PlaytestingComponent,
    PuzzleFeedbackComponent,
    HintComponent,
    PuzzleComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    FieldsetModule,
    CheckboxModule,
    RatingModule,

    // PrimeNG
    ToolbarModule,
    ButtonModule,
    InputTextModule,

    // Our app
    SharedPuzzleModule,
    PlaytestingRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class PlaytestingModule {}
