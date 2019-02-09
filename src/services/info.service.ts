import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { FSInfo } from 'src/models/fs-info.model';


@Injectable({
  providedIn: 'root'
})
export class InfoService {
  readonly infoCollection: AngularFirestoreCollection<FSInfo>;

  constructor(af: AngularFirestore) {
      this.infoCollection = af.collection<FSInfo>('info');
   }

   getInfo(slug: string): AngularFirestoreDocument<FSInfo> {
      return this.infoCollection.doc<FSInfo>(slug);
   }
}
