// Angular Libs
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Angular Fire Libs
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireStorageModule } from '@angular/fire/storage';

// Our Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from '../components/footer.component';
import { HeaderComponent } from '../components/header.component';
import { VariablesPipe } from '../pipes/variables.pipe';
import { TestAllComponent } from './test-all/test-all.component';
import { environment } from '../environments/environment';
import { HomeComponent } from '../components/home.component';
import { EditorComponent } from './editor/editor.component';
import { WebmasterComponent } from './webmaster/webmaster.component';
import { PlaytestingComponent } from './playtesting/playtesting.component';
import { UserAuthComponent } from '../components/user-auth.component';
import { EditPuzzleSetComponent } from '../components/edit-puzzle-set.component';

// PrimeNG
import { CardModule } from 'primeng/card';
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
import { PuzzleSetsComponent } from '../components/puzzle-sets.component';
import { CarouselModule } from 'primeng/carousel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { OrderListModule } from 'primeng/orderlist';
import { RefToPuzzlePipe } from "src/pipes/refToPuzzle.pipe";
import { DropdownModule } from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { PuzzleComponent } from '../components/puzzle.component';
import { AccordionModule } from 'primeng/accordion';
import { HintComponent } from '../components/hint.component';

// Firebase credentials (okay to be public)
const config = {
  apiKey: 'AIzaSyAjhlNnJzXejhVD_sJIP7q0nMNd84y9vnM',
  authDomain: 'pp-pigpen.firebaseapp.com',
  databaseURL: 'https://pp-pigpen.firebaseio.com',
  projectId: 'pp-pigpen',
  storageBucket: 'pp-pigpen.appspot.com',
  messagingSenderId: '692886874617'
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserAuthComponent,
    TestAllComponent,
    HomeComponent,
    EditorComponent,
    WebmasterComponent,
    PlaytestingComponent,
    EditPuzzleSetComponent,
    PuzzleSetsComponent,

    VariablesPipe,
    RefToPuzzlePipe,
    PuzzleComponent,
    HintComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    // AngularFire
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule, // auth
    AngularFirestoreModule.enablePersistence(), // firestore
    // AngularFireStorageModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }), // storage

    // PrimeNG
    CardModule,
    ScrollPanelModule,
    ButtonModule,
    SplitButtonModule,
    ToolbarModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    FieldsetModule,
    CarouselModule,
    InputTextModule,
    InputSwitchModule,
    CalendarModule,
    OrderListModule,
    DropdownModule,
    TableModule,
    AccordionModule,
    // Our app
    AppRoutingModule,

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
