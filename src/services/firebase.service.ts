import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
}
