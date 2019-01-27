import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Info } from 'src/models/info.model';


@Injectable({
  providedIn: 'root'
})
export class InfoService {
  readonly infoCollection: AngularFirestoreCollection<Info>;

  constructor(fb: FirebaseService) {
      this.infoCollection = fb.getCollection<Info>('info');
   }

   getInfo(slug: string) {
      return this.infoCollection.doc<Info>(slug);
   }
}
