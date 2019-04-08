// raw files
import { environment } from '../environments/environment';

// Our Services
import { SentryService } from 'src/shared/root/sentry.service';

// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MessageService } from 'primeng/api';

// Angular Fire Libs
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Our Components
import { AppComponent } from './app.component';

// Our Modules
import { AppRoutingModule } from './app-routing.module';
import { RootModule } from "src/shared/root/root.module";

// Firebase credentials (okay to be public)
const config = {
  apiKey: 'AIzaSyAjhlNnJzXejhVD_sJIP7q0nMNd84y9vnM',
  authDomain: 'puzzledpint.org',
  databaseURL: 'https://pp-pigpen.firebaseio.com',
  projectId: 'pp-pigpen',
  storageBucket: 'pp-pigpen.appspot.com',
  messagingSenderId: '692886874617'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AngularFire
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule, // auth
    AngularFirestoreModule, // firestore
    // AngularFireStorageModule,

    // PrimeNG
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }), // storage

    RootModule,
    AppRoutingModule // must be last because of the catch-all
  ],
  providers: [MessageService, { provide: ErrorHandler, useClass: SentryService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
