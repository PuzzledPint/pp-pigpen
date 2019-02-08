import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FSUserDoc } from "src/models/fsuserdoc.model";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private afs: AngularFirestore;

  constructor(afs: AngularFirestore) {
    this.afs = afs;
  }

  getCollection<T>(col: string) {
    return this.afs.collection<T>(col);
  }

  getUserDocRef(id: string): AngularFirestoreDocument<FSUserDoc> {
    return this.afs.doc(`users/${id}`);
  }

}
