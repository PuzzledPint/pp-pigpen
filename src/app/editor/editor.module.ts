// Angular Libs
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

// Our Components
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';

@NgModule({
  declarations: [
    EditorComponent
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
    EditorRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class EditorModule {}
