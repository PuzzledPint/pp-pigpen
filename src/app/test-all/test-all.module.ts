import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TestAllComponent } from "./test-all.component";
import { TestAllRoutingModule } from "./test-all-routing.module";

// Angular Libs

// PrimeNG
import { CardModule as PNGCardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
import { CarouselModule } from 'primeng/carousel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { OrderListModule } from 'primeng/orderlist';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { EditorModule as PNGEditorModule } from 'primeng/editor';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';

// Our Components
import { HintComponent } from '../components/hint.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { SitewideAlertComponent } from '../components/sitewide-alert.component';
import { TestAllComponent } from './test-all/test-all.component';
import { HomeComponent } from '../components/home.component';
import { EditorComponent } from './editor/editor.component';
import { WebmasterComponent } from './webmaster/webmaster.component';
import { PlaytestingComponent } from './playtesting/playtesting.component';
import { UserAuthComponent } from '../components/user-auth.component';
import { EditPuzzleSetComponent } from '../components/edit-puzzle-set.component';
import { PuzzleSetsComponent } from '../components/puzzle-sets.component';
import { PuzzleComponent } from '../components/puzzle.component';
import { PuzzleFeedbackComponent } from '../components/puzzle-feedback.component';
import { InfoCardComponent } from '../components/info-card.component';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewPuzzleFeedbackComponent } from "src/components/view-puzzle-feedback.component";
import { EmailButtonComponent } from "src/components/email-button.component";

// Our Pipes
import { RefToPuzzlePipe } from "src/pipes/refToPuzzle.pipe";
import { VariablesPipe } from '../pipes/variables.pipe';


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
