import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from "@angular/fire/firestore";

import { User, auth } from 'firebase/app';

import { Subject } from "rxjs";

import { FSUserDoc } from "../models/fs-user-doc.model";
import { take, tap } from "rxjs/operators";

export type AnyRole = keyof HQTeams;

export interface HQTeams {
  Editor: boolean;
  CityOps: boolean;
  Comms: boolean;
  Webmaster: boolean;
  Showrunner: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public isSignedIn: Subject<boolean> = new Subject<boolean>();
  public id: Subject<string> = new Subject<string>();
  public name: Subject<string> = new Subject<string>();
  public email: Subject<string> = new Subject<string>();
  public photo: Subject<string> = new Subject<string>();
  public isEditor: Subject<boolean> = new Subject<boolean>();
  public isCityOps: Subject<boolean> = new Subject<boolean>();
  public isComms: Subject<boolean> = new Subject<boolean>();
  public isWebmaster: Subject<boolean> = new Subject<boolean>();
  public isShowrunner: Subject<boolean> = new Subject<boolean>();

  public GCCity: Subject<string> = new Subject<string>();
  public fsdoc: AngularFirestoreDocument<FSUserDoc> | undefined = undefined;

  public currentId: string | null = null;

  // A user consists of two places:
  // Auth from firebase, and user profile.

  constructor(public afAuth: AngularFireAuth, public af: AngularFirestore) {
    // get user updates
    afAuth.user.subscribe(
      newFbUser => this.updateFbUser(newFbUser),
      err => {
        this.updateFbUser(null);
        console.log('fbUser error: ' + err);
      },
      () => {
        this.updateFbUser(null);
        console.log('fbUser closed');
      }
    );
  }

  updateFbUser(newFbUser: User | null) {
    this.isSignedIn.next(!!newFbUser);
    this.id.next(newFbUser ? newFbUser.uid : undefined);
    this.currentId = newFbUser ? newFbUser.uid : null;
    this.name.next(newFbUser ? newFbUser.displayName || '' : undefined);
    this.email.next(newFbUser ? newFbUser.email || '' : undefined);
    this.photo.next(newFbUser ? newFbUser.photoURL || '' : undefined);

    if (newFbUser) {
      newFbUser.getIdTokenResult().then(
        newToken => {
          const claims = newToken.claims;
          this.isEditor.next(claims.Editor);
          this.isCityOps.next(claims.CityOps);
          this.isComms.next(claims.Comms);
          this.isWebmaster.next(claims.Webmaster);
          this.isShowrunner.next(claims.Showrunner);

          this.GCCity.next(claims.GCCity);
        });

      this.fsdoc = this.af.doc(`user/${newFbUser.uid}`);
    } else {
      this.isEditor.next(false);
      this.isCityOps.next(false);
      this.isComms.next(false);
      this.isWebmaster.next(false);
      this.isShowrunner.next(false);

      this.GCCity.next(undefined);

      this.fsdoc = undefined;
    }
  }

  signIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(credential => { });  // need this?
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  hasRole(role: Subject<boolean>, fail: () => any) {
    return role.pipe(
      take(1),
      tap(hr => {
        if (!hr) {
          console.log('access denied');
          fail();
        }
      })
    );
  }
}
