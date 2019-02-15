import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { FSPlaytestFeedback } from "../models/fs-playtest-feedback.model";
import { UserService } from "./user.service";
import { Util } from './util';

export class PlaytestFeedback {
  inner: FSPlaytestFeedback;
  numPlaytesters_error = "";
  solveMinutes_error = "";
  difficulty_error = "";
  fun_error = "";

  get numPlaytesters() {
    return Util.numToString(this.inner.numPlaytesters);
  }
  set numPlaytesters(s: string) {
    const i = +s;
    this.inner.numPlaytesters = i;
    this.numPlaytesters_error =
      Number.isInteger(i) && i > 0
        ? ""
        : "number of playtesters must be a positive whole number";
    this.save();
  }
  get version() {
    return this.inner.version;

  }
  set version(s: string) {
    this.inner.version = s;
    this.save();
  }

  get solveMinutes() {
    return Util.numToString(this.inner.solveMinutes);
  }
  set solveMinutes(s: string) {
    const i = +s;
    this.inner.solveMinutes = i;
    this.solveMinutes_error =
      Number.isInteger(i) && i > 0
        ? ""
        : "solving time must be a positive whole number of minutes";
    this.save();
  }

  get difficulty() {
    return this.inner.difficulty;
  }
  set difficulty(i: number) {
    this.inner.difficulty = i;
    this.difficulty_error =
      Number.isInteger(i) && i > 0 ? "" : "please select a difficulty level";
    this.save();
  }
  get fun() {
    return this.inner.fun;
  }
  set fun(i: number) {
    this.inner.fun = i;
    this.fun_error =
      Number.isInteger(i) && i > 0 ? "" : "please select a fun level";
    this.save();
  }

  constructor(private afDoc: AngularFirestoreDocument<FSPlaytestFeedback>, puzzleRef: DocumentReference) {
    this.inner = {
      puzzleRef: puzzleRef,
      numPlaytesters: 0,
      version: "",
      solved: false,
      solveMinutes: 0,
      difficulty: 0,
      fun: 0,
      errors: "",
      visual: "",
      general: ""
    };

    // subscribe to DB updates
    afDoc.valueChanges().subscribe(newfs => {
      if (newfs) {
        Object.assign<FSPlaytestFeedback, FSPlaytestFeedback>(
          this.inner,
          newfs
        );
      }
    });
  }

  save() {
    const anyerrors =
      this.numPlaytesters_error ||
      this.solveMinutes_error ||
      this.fun_error ||
      this.difficulty_error;
    if (!anyerrors) {
      this.afDoc.set(this.inner);
    }
  }
}

@Injectable({
  providedIn: "root"
})
export class PlaytestService {
  playtestCollection: AngularFirestoreCollection<FSPlaytestFeedback> | undefined;

  constructor(
    private readonly af: AngularFirestore,
    private readonly us: UserService
  ) {
    if (us.fsdoc) {
      this.playtestCollection = us.fsdoc.collection<FSPlaytestFeedback>("playtestFeedback");
    }
  }
  // Public interface

  getPlaytestFeedback(puzzleRef: DocumentReference): PlaytestFeedback {
    if (this.playtestCollection) {
      return new PlaytestFeedback(this.playtestCollection.doc(puzzleRef.id), puzzleRef);
    }
    throw new Error("tried to get playtest feedback of user with no id");
  }
}
