// For importing 2rd party libs that don't change often
import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SentryService } from 'src/services/sentry.service';

// Angular Fire Libs
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AngularFire
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule, // auth
    AngularFirestoreModule.enablePersistence(), // firestore
    // AngularFireStorageModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }), // storage
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AngularFire
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ServiceWorkerModule,
  ],
  providers: [{provide: ErrorHandler, useClass: SentryService}]
})
export class RootModule {
}
