import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class HQUserService {
//  public fsdoc: AngularFirestoreDocument<FSUserDoc> | undefined = undefined;

  constructor(public af: AngularFirestore) {
  }
}
