import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FSInfo } from 'src/models/fsinfo.model';


@Injectable({
  providedIn: 'root'
})
export class InfoService {
  readonly infoCollection: AngularFirestoreCollection<FSInfo>;

  constructor(fb: FirebaseService) {
      this.infoCollection = fb.getCollection<FSInfo>('info');
   }

   getInfo(slug: string): AngularFirestoreDocument<FSInfo> {
      return this.infoCollection.doc<FSInfo>(slug);
   }
}
