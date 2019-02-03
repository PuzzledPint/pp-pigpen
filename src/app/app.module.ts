import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Angular Fire Libs
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FooterComponent } from '../components/footer.component';
import { HeaderComponent } from '../components/header.component';
import { VariablesPipe } from '../pipes/variables.pipe';
import { TestAllComponent } from './test-all/test-all.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
  declarations: [AppComponent, FooterComponent, HeaderComponent, VariablesPipe, TestAllComponent],
  imports: [BrowserModule,
    // AngularFire
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
