// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from "primeng/message";
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { OrderListModule } from 'primeng/orderlist';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

// shared
import { SharedPuzzleModule } from 'src/components/puzzle/shared-puzzle.module';

// Our Components
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { EditPuzzleSetComponent } from "./edit-puzzle-set.component";
import { ViewPuzzleFeedbackComponent } from "./view-puzzle-feedback.component";
import { EmailButtonComponent } from "./email-button.component";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";

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
    FieldsetModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    CalendarModule,
    OrderListModule,
    InputSwitchModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    DropdownModule,
    TableModule,

    // Our app
    SharedPuzzleModule,
    EditorRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class EditorModule {}
