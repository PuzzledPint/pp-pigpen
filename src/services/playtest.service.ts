import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument, DocumentReference, AngularFirestoreCollection } from "@angular/fire/firestore";

import { FSPlaytestFeedback } from "../models/fs-playtest-feedback.model";
import { UserService } from "./user.service";
import { Util } from "./util";
import { NotifyService } from "./notify.service";
import { Observable } from "rxjs";
import { map, tap, shareReplay } from "rxjs/operators";
import { Puzzle } from "./puzzle.service";
import { Timestamp } from '@firebase/firestore-types';
import { SentryService } from "./sentry.service";

export interface PlaytestFeedbackAugmented extends FSPlaytestFeedback {
  userId: string;
  lastChanged: Timestamp;
}

export class PlaytestFeedback {
  public inner: FSPlaytestFeedback;
  public numPlaytesters_error = "";
  public solveMinutes_error = "";
  public difficulty_error = "";
  public fun_error = "";
  public isDirty = false;

  public static get csvHeader(): string {
    return "Puzzle, lastUpdated, numPlaytesters, name, email, version, solved, solveMinutes, difficulty, fun, errors, visual, general";
  }

  public static makeCSVRow(puzzleName: string, pfa: PlaytestFeedbackAugmented) {
    const escErrors = pfa.errors.replace(/"/g, '""');
    const escVisual = pfa.visual.replace(/"/g, '""');
    const escGeneral = pfa.general.replace(/"/g, '""');
    const lastDate = pfa.lastChanged.toDate();
    const last = lastDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) + " " + lastDate.toLocaleTimeString();
    // tslint:disable-next-line
    return `"${puzzleName}","${last}","${pfa.numPlaytesters}","${pfa.name}","${pfa.email}","${pfa.version}","${pfa.solved}","${pfa.solveMinutes}","${pfa.difficulty}","${pfa.fun}","${escErrors}","${escVisual}","${escGeneral}"`;
  }

  get numPlaytesters() {
    return Util.numToString(this.inner.numPlaytesters);
  }
  set numPlaytesters(s: string) {
    const i = +s;
    this.dirty(i, this.inner.numPlaytesters);
    this.inner.numPlaytesters = i;
    this.numPlaytesters_error = Number.isInteger(i) && i > 0 ? "" : "number of playtesters must be a positive whole number";
  }
  get version() {
    return this.inner.version;
  }
  set version(s: string) {
    this.dirty(s, this.inner.version);
    this.inner.version = s;
  }
  get solved() {
    return this.inner.solved;
  }
  set solved(b: boolean) {
    this.dirty(b, this.inner.solved);
    this.inner.solved = b;
  }

  get solveMinutes() {
    return Util.numToString(this.inner.solveMinutes);
  }
  set solveMinutes(s: string) {
    const i = +s;
    this.dirty(i, this.inner.solveMinutes);
    this.inner.solveMinutes = i;
    this.solveMinutes_error = Number.isInteger(i) && i > 0 ? "" : "solving time must be a positive whole number of minutes";
  }

  get difficulty() {
    return this.inner.difficulty;
  }
  set difficulty(i: number) {
    this.dirty(i, this.inner.difficulty);
    this.inner.difficulty = i;
    this.difficulty_error = Number.isInteger(i) && i > 0 ? "" : "please select a difficulty level";
  }
  get fun() {
    return this.inner.fun;
  }
  set fun(i: number) {
    this.dirty(i, this.inner.fun);
    this.inner.fun = i;
    this.fun_error = Number.isInteger(i) && i > 0 ? "" : "please select a fun level";
  }
  get errors() {
    return this.inner.errors;
  }
  set errors(s: string) {
    this.dirty(s, this.inner.errors);
    this.inner.errors = s;
  }
  get visual() {
    return this.inner.visual;
  }
  set visual(s: string) {
    this.dirty(s, this.inner.visual);
    this.inner.visual = s;
  }
  get general() {
    return this.inner.general;
  }
  set general(s: string) {
    this.dirty(s, this.inner.general);
    this.inner.general = s;
  }

  private dirty(a: string | number | boolean, b: string | number | boolean) {
    if (a !== b) {
      this.isDirty = true;
    }
  }

  constructor(private afDoc: AngularFirestoreDocument<FSPlaytestFeedback>, puzzleRef: DocumentReference, name: string, email: string) {
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
      general: "",
      name: name,
      email: email,
    };

    // subscribe to DB updates
    afDoc.valueChanges().subscribe(newfs => {
      if (newfs) {
        Object.assign<FSPlaytestFeedback, FSPlaytestFeedback>(this.inner, newfs);
      }
    });
  }

  public save(ns: NotifyService) {
    let go = true;
    if (this.numPlaytesters_error) {
      ns.error("Invalid Field", this.numPlaytesters_error);
      go = false;
    }
    if (this.difficulty_error) {
      ns.error("Invalid Field", this.difficulty_error);
      go = false;
    }
    if (this.solveMinutes_error) {
      ns.error("Invalid Field", this.solveMinutes_error);
      go = false;
    }
    if (this.fun_error) {
      ns.error("Invalid Field", this.fun_error);
      go = false;
    }

    if (go) {
      this.afDoc.set(this.inner);
      this.isDirty = false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class PlaytestService {
  public playtestCollection: AngularFirestoreCollection<FSPlaytestFeedback> | undefined;

  constructor(private readonly af: AngularFirestore, private readonly us: UserService, private readonly ns: NotifyService, private ss: SentryService) {
    us.isSignedIn.subscribe(
      (authenticated) => {
        if (authenticated) {
          if (us.fsdoc) {
            this.playtestCollection = us.fsdoc.collection<FSPlaytestFeedback>("playtestFeedback");
          } else {
            ss.log("user document not found in Playtest Service", true);
          }
        } else {
          this.playtestCollection = undefined;
        }
      });
  }

  // Public interface

  public getPlaytestFeedback(puzzleRef: DocumentReference): PlaytestFeedback {
    if (this.playtestCollection) {
      return new PlaytestFeedback(this.playtestCollection.doc(puzzleRef.id), puzzleRef, this.us.name, this.us.email);
    }
    throw new Error("tried to get playtest feedback of user with no id");
  }

  public getPlaytestFeedbackAugmented(puzzle: Puzzle): Observable<PlaytestFeedbackAugmented[]> {
    const col = puzzle.afDoc.collection<PlaytestFeedbackAugmented>(`playtestFeedback`, ref => ref.orderBy("lastChanged"));

    return col.snapshotChanges().pipe(
      tap(arr => this.ss.log(`read ${arr.length} docs from puzzle/playtestFeedback collection`)),
      map(
        actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const userId = a.payload.doc.id;
            return { userId, ...data };
          }),
        shareReplay(1)
      )
    );
  }
}
