import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FSUserDoc } from "src/models/fsuserdoc.model";
import { FSRoles } from "src/models/fsroles.model";

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

  getRolesDocRef(id: string): AngularFirestoreDocument<FSRoles> | undefined {
    if (id) { return this.afs.doc(`roles/${id}`); } else { return undefined; }
  }

}
