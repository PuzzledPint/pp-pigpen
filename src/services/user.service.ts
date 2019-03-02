import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";

import { User, auth } from "firebase/app";

import { FSUserDoc } from "../models/fs-user-doc.model";
import { Subject } from 'rxjs';

export type AnyRole = keyof HQTeams;

export interface HQTeams {
  Editor: boolean;
  CityOps: boolean;
  Comms: boolean;
  Webmaster: boolean;
  Showrunner: boolean;
}

@Injectable({
  providedIn: "root"
})
export class UserService {
  public isSignedIn: Subject<boolean> = new Subject<boolean>();

  public id = "";
  public name = "";
  public email = "";
  public photo = "";
  public isEditor = false;
  public isCityOps = false;
  public isComms = false;
  public isWebmaster = false;
  public isShowrunner = false;

  public GCCity = "";
  public fsdoc: AngularFirestoreDocument<FSUserDoc> | undefined = undefined;

  // A user consists of two places:
  // Auth from firebase, and user profile.

  constructor(public afAuth: AngularFireAuth, public af: AngularFirestore) {
    // get user updates
    afAuth.user.subscribe(
      newFbUser => this.updateFbUser(newFbUser),
      err => {
        this.updateFbUser(null);
        console.log("fbUser error: " + err);
      },
      () => {
        this.updateFbUser(null);
        console.log("fbUser closed");
      }
    );
  }

  public async updateFbUser(newFbUser: User | null) {
    this.id = newFbUser ? newFbUser.uid : "";
    this.name = newFbUser ? newFbUser.displayName || "" : "";
    this.email = newFbUser ? newFbUser.email || "" : "";
    this.photo = newFbUser ? newFbUser.photoURL || "" : "";

    if (newFbUser) {
      const newToken = await newFbUser.getIdTokenResult(true);
      const claims = newToken.claims;
      this.isEditor = claims.Editor;
      this.isCityOps = claims.CityOps;
      this.isComms = claims.Comms;
      this.isWebmaster = claims.Webmaster;
      this.isShowrunner = claims.Showrunner;

      this.GCCity = claims.GCCity;
      this.fsdoc = this.af.doc(`users/${newFbUser.uid}`);
    } else {
      this.isEditor = false;
      this.isCityOps = false;
      this.isComms = false;
      this.isWebmaster = false;
      this.isShowrunner = false;

      this.GCCity = "";

      this.fsdoc = undefined;
    }
    this.isSignedIn.next(!!newFbUser);
  }

  public signIn() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {}); // need this?
  }

  public signOut() {
    this.afAuth.auth.signOut();
  }
}
