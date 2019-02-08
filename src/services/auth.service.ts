import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument } from "@angular/fire/firestore";

import { FirebaseService } from "./firebase.service";

import { User, auth } from 'firebase/app';
import { take, tap, map } from 'rxjs/operators';

import { Subscription, Subject } from "rxjs";

import { FSRoles, HQTeams } from '../models/fsroles.model';
import { FSUserDoc } from "../models/fsuserdoc.model";

export type AnyRole = keyof HQTeams;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public id = '';
  private rolesSub: Subscription | undefined = undefined;
  public roles: FSRoles = FSRoles.none();
  public userSubject: Subject<void> = new Subject<void>();
  public isSignedIn: Subject<boolean> = new Subject<boolean>();
  public email = '';
  public name = 'Not Signed In';
  public photo = '';
  public docRef: AngularFirestoreDocument<FSUserDoc> | undefined;
  fbUser: User | undefined;


  // A user consists of three pieces of data:
  // Auth from firebase, roles, and user profile.  All of these need to exist for the user to be fully 'realized'

  constructor(public afAuth: AngularFireAuth, public fs: FirebaseService) {
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

  get isGC(): boolean { return this.gcCity.length > 0; }

  get isEditor(): boolean { return this.hqTeams.Editor; }
  get isCityOps(): boolean { return this.hqTeams.CityOps; }
  get isComms(): boolean { return this.hqTeams.Comms; }
  get isWebmaster(): boolean { return this.hqTeams.Webmaster; }
  get isShowrunner(): boolean { return this.hqTeams.Showrunner; }

  get GCCity(): string {
    return this.gcCity;
  }

  updateFbUser(newFbUser: User | null) {
    this.fbUser = newFbUser ? newFbUser : undefined;

    if (newFbUser) {
      this.isSignedIn.next(true);
      this.email = newFbUser.email || 'No Email';
      this.name = newFbUser.displayName || 'No Name';
      this.id = newFbUser.uid;
      this.photo = newFbUser.photoURL || '';
    } else {
      this.isSignedIn.next(false);
      this.email = '';
      this.name = 'Not Signed In';
      this.id = '';
      this.roles = FSRoles.none();
      this.docRef = undefined;
    }
  }

  updateFbUser(newUser: User | null) {
    this._user.updateFbUser(newUser);
    if (newUser) {
      this.initLinkedDocs();
    } else {
      if (this.rolesSub) { this.rolesSub.unsubscribe(); }
    }

  }


  afterAuth(uc: auth.UserCredential) {
    this._user.updateFbCredential(uc);
    this.initLinkedDocs();
  }

  initLinkedDocs() {
    this._user.docRef = this.fs.getUserDocRef(this._user.id);
    const rolesDoc = this.fs.getRolesDocRef(this._user.id);
    if (rolesDoc) {
      rolesDoc.valueChanges().subscribe(
      newRoles => this._user.updateRoles(newRoles),
      err => { this._user.updateRoles(undefined); console.error(err); },
      () => { this._user.updateRoles(undefined); console.log(closed); });
    }
  }

  updateFbCredential(uc: auth.UserCredential | undefined) {
    //   additionalUserInfo ?: firebase.auth.AdditionalUserInfo | null;
    // credential: firebase.auth.AuthCredential | null;
    // operationType?: string | null;
    this.updateFbUser(uc ? uc.user : null);
  }













  signin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(credential => this.afterAuth(credential));
  }

  signout() {
    this.afAuth.auth.signOut();
  }

  hasRole(role: AnyRole, fail: () => any) {
    return this._user.rolesSubject.pipe(
      take(1),
      map(
        roles => {
          return roles.has(role);
        }
      ),
      tap(hr => {
        if (!hr) {
          console.log('access denied');
          fail();
        }
      })
    );
  }

   get isSignedIn(): Subject<boolean>  {
     return this._user.isSignedIn;
   }

  isSignedInGuardPipe(fail: () => any) {
    return this._user.isSignedIn.pipe(
      take(1),
      tap(loginStatus => {
        if (!loginStatus) {
          console.log('access denied');
          fail();
        }
      })
    );
  }


  get allHQTeams(): Array<string> {
    return Object.keys(this.hqTeams);
  }


    static none(): FSRoles {
      return new FSRoles();
    }

    has(role: AnyRole): boolean {
      return this.hqTeams[role];
    }
  }


  updateRoles(newRoles: FSRoles | undefined) {
    if (newRoles) {
      Object.assign(this.roles, newRoles);
    } else {
      this.roles = FSRoles.none();
    }
    this.rolesSubject.next(this.roles);
  }
}

}
