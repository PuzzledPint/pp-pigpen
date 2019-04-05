// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from "primeng/fieldset";
import { CheckboxModule } from "primeng/checkbox";
import { RatingModule } from 'primeng/rating';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from "primeng/card";

// shared
import { SharedPuzzleModule } from 'src/shared/puzzle/shared-puzzle.module';

// Our Components
import { PlaytestingComponent } from './playtesting.component';
import { PuzzleFeedbackComponent } from "./components/puzzle-feedback.component";
import { HintComponent } from "./components/hint.component";
import { PuzzleComponent } from "./components/puzzle.component";

@NgModule({
  declarations: [
    PlaytestingComponent,
    PuzzleFeedbackComponent,
    HintComponent,
    PuzzleComponent,
  ],
  exports: [
    PlaytestingComponent
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,

    // PrimeNG
    AccordionModule,
    CardModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    ToolbarModule,
    CheckboxModule,
    RatingModule,
    MessageModule,
    MessagesModule,

    // Our app
    SharedPuzzleModule,
  ],
  providers: [],
  bootstrap: []
})
export class PlaytestingModule {}
