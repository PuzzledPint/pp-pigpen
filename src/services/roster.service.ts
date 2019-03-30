import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from "@angular/fire/firestore";
import { FSRosterEntry } from "src/models/fs-roster-entry.model";
import { InternalNgModuleRef } from "@angular/core/src/linker/ng_module_factory";
import { isEmailValid } from 'src/shared/validation-utils';

// export interface FSPermissions {
//   active: boolean;
//   city: string;
//   country: string;
//   name: string;
//   nickname: string;
//   gmail: string;
//   start: Date;
//   notes: string;
// }

export class RosterEntry {
  public inner: FSRosterEntry;
  public gmail_error = "";
  public isDirty = false;
  private index = 0;

  get active() {
    return this.inner.active;
  }
  set active(b: boolean) {
    this.dirty(b, this.inner.active);
    this.inner.active = b;
  }
  get city() {
    return this.inner.city;
  }
  set city(s: string) {
    this.dirty(s, this.inner.city);
    this.inner.city = s;
  }
  get country() {
    return this.inner.country;
  }
  set country(s: string) {
    this.dirty(s, this.inner.country);
    this.inner.country = s;
  }
  get name() {
    return this.inner.city;
  }
  set name(s: string) {
    this.dirty(s, this.inner.city);
    this.inner.city = s;
  }
  get nickname() {
    return this.inner.nickname;
  }
  set nickname(s: string) {
    this.dirty(s, this.inner.nickname);
    this.inner.nickname = s;
  }
  get gmail() {
    return this.inner.gmail;
  }
  set gmail(s: string) {
    this.dirty(s, this.inner.gmail);
    this.inner.gmail = s;
    this.gmail_error = isEmailValid(s) ? "" : "invalid gmail address";
  }
  get start() {
    return this.inner.start;
  }
  set start(d: Date) {
    this.dirty(d, this.inner.start);
    this.inner.start = d;
  }
  get notes() {
    return this.inner.notes;
  }
  set notes(s: string) {
    this.dirty(s, this.inner.notes);
    this.inner.notes = s;
  }

  private dirty(a: string | number | boolean | Date, b: string | number | boolean | Date) {
    if (a !== b) {
      this.isDirty = true;
    }
  }

  constructor(fsre: FSRosterEntry[], i: number) {
    this.inner = fsre[i];

    if (!this.inner) {
      this.inner = {
        active: true,
        city: "",
        country: "",
        name: "",
        nickname: "",
        gmail: "",
        start: new Date(),
        notes: "",
      };
    }

    this.index = i;
  }
}

@Injectable({
  providedIn: "root",
})
export class RosterService {
//   public fsdoc: AngularFirestoreDocument<FSRosterEntry[]> | undefined = undefined;

//   constructor(private afDoc: AngularFirestoreDocument<FSRosterEntry[]>) {
//     this.inner = {
//       active: true,
//       city: "",
//       country: "",
//       name: "",
//       nickname: "",
//       gmail: "",
//       start: new Date(),
//       notes: "",
//     };

//     // subscribe to DB updates
//     afDoc.valueChanges().subscribe(newfs => {
//       if (newfs) {
//         Object.assign<FSPlaytestFeedback, FSPlaytestFeedback>(this.inner, newfs);
//       }
//     });
//   }

//   constructor(public af: AngularFirestore) {
//     this.fsdoc = af.doc('cityops/roster');
//   }

//   public save(ns: NotifyService) {
//     let go = true;
//     if (this.numPlaytesters_error) {
//       ns.error("Invalid Field", this.numPlaytesters_error);
//       go = false;
//     }
//     if (this.difficulty_error) {
//       ns.error("Invalid Field", this.difficulty_error);
//       go = false;
//     }
//     if (this.solveMinutes_error) {
//       ns.error("Invalid Field", this.solveMinutes_error);
//       go = false;
//     }
//     if (this.fun_error) {
//       ns.error("Invalid Field", this.fun_error);
//       go = false;
//     }

//     if (go) {
//       this.afDoc.set(this.inner);
//       this.isDirty = false;
//     }
//   }
// }

}
