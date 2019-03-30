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
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { EditPuzzleSetComponent } from "./edit-puzzle-set.component";
import { ViewPuzzleFeedbackComponent } from "./view-puzzle-feedback.component";
import { EmailButtonComponent } from "./email-button.component";

@NgModule({
  declarations: [
    EditorComponent,
    EditPuzzleSetComponent,
    ViewPuzzleFeedbackComponent,
    EmailButtonComponent,
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
    SharedPuzzleModule,
    EditorRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class EditorModule {}
