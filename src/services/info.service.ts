import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { FSInfo } from "../models/fs-info.model";
import { Util } from "./util";
import { NotifyService } from "./notify.service";

export class Info {
  inner: FSInfo;
  isDirty = false;

  get footer() {
    return this.inner.footer;
  }
  set footer(s: string) {
    this.dirty(s, this.inner.footer);
    this.inner.footer = s;
  }
  get alertHeader() {
    return this.inner.alertHeader;
  }
  set alertHeader(s: string) {
    this.dirty(s, this.inner.alertHeader);
    this.inner.alertHeader = s;
  }

  private dirty(a: string | number | boolean, b: string | number | boolean) {
    if (a !== b) {
      this.isDirty = true;
    }
  }

  constructor(private afDoc: AngularFirestoreDocument<FSInfo>) {
    this.inner = {
      alertHeader: "",
      footer: ""
    };

    // subscribe to DB updates
    afDoc.valueChanges().subscribe(newfs => {
      if (newfs) {
        Object.assign<FSInfo, FSInfo>(this.inner, newfs);
      }
    });
  }

  save(ns: NotifyService) {
    this.afDoc.set(this.inner);
    this.isDirty = false;
  }
}

@Injectable({
  providedIn: "root"
})
export class InfoService {
  constructor(private readonly af: AngularFirestore) {}
  // Public interface

  getInfo(): Info {
    return new Info(this.af.doc('/info/info'));
  }
}
