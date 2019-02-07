import { Injectable } from '@angular/core';
import { PPUser } from 'src/models/ppuser.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { take, tap, map } from 'rxjs/operators';
import { FirebaseService } from "./firebase.service";
import { HQTeams } from "src/models/roles.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: PPUser = PPUser.none();

  get user(): PPUser {
    return this._user;
  }

  constructor(public afAuth: AngularFireAuth, public fs: FirebaseService) {
    afAuth.user.subscribe(
      newFbUser => this._user.updateFbUser(newFbUser),
      err => {
        this._user.updateFbUser(undefined);
        console.log('fbUser error: ' + err);
      },
      () => {
        this._user.updateFbUser(undefined);
        console.log('fbUser closed');
      }
      );
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(this.afterAuth);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  afterAuth(uc: auth.UserCredential) {
    this._user.updateFbCredential(uc);
    this._user.docRef = this.fs.getUserDocRef(this._user.id);
    this.fs.getRolesDocRef(this._user.id).valueChanges().subscribe(
      newRoles => this._user.updateRoles(newRoles),
      err => { this._user.updateRoles(undefined); console.error(err); },
      () => { this._user.updateRoles(undefined); console.log(closed); });
  }

  hasRole<T extends keyof HQTeams>(role: T, fail: () => any) {
    return this._user.loggedIn.pipe(
      take(1),
      map(loggedIn => this._user.roles.has(role)),
      tap(hr => {
        if (!hr) {
          console.log('access denied');
          fail();
        }
      })
    );
  }

  isLoggedIn(fail: () => any) {
    return this._user.loggedIn.pipe(
      take(1),
      tap(loginStatus => {
        if (!loginStatus) {
          console.log('access denied');
          fail();
        }
      })
    );
  }
}
