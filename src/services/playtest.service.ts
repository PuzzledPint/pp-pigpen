import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";

import { Observable, Subject, BehaviorSubject } from "rxjs";

import { FSPlaytestFeedback } from "../models/fs-playtest-feedback.model";
import { UserService } from "./auth.service";
import { Util } from "./util";

export interface PlaytestFeedback extends FSPlaytestFeedback {
  afDoc: AngularFirestoreDocument<FSPlaytestFeedback>;
}

@Injectable({
  providedIn: "root"
})
export class PlaytestService {
  constructor(
    private readonly af: AngularFirestore,
    private readonly us: UserService
  ) {}

  // Public interface

  updatePlaytestFeedback(feedback: PlaytestFeedback) {
    const { afDoc, ...fs } = feedback;
    afDoc.set(fs);
  }

  private getPlaytestFeedbackDoc(
    puzzleRef: DocumentReference
  ): AngularFirestoreDocument<FSPlaytestFeedback> {
    const userRef = this.us.id;
    return this.af.doc<FSPlaytestFeedback>(
      `/users/${userRef}/playtestFeedback/${puzzleRef}`
    );
  }
  getPlaytestFeedback(
    puzzleRef: DocumentReference
  ): Observable<PlaytestFeedback> {
    return Util.fromFS<FSPlaytestFeedback, PlaytestFeedback>(
      this.getPlaytestFeedbackDoc(puzzleRef)
    );
  }

  addPlaytestFeedback(pr: DocumentReference | undefined) {
    if (pr) {
      const doc = this.getPlaytestFeedbackDoc(pr);
      doc.set({
        puzzleRef: pr,
        numPlaytesters: 0,
        version: "",
        solved: false,
        solveMinutes: 0,
        difficulty: 0,
        fun: 0,
        errors: "",
        visual: "",
        general: ""
      });
    } else {
      console.error("AddPlaytestFeedback called with null puzzleRef");
    }
  }
}
