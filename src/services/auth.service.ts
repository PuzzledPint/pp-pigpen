import { Injectable } from '@angular/core';
import { PPUser } from 'src/models/ppuser.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: PPUser = PPUser.none();

  get user(): PPUser {
    return this._user;
  }

  constructor(public afAuth: AngularFireAuth) {
    afAuth.user.subscribe(
      newFbUser => this._user.updateFbUser(newFbUser),
      err => {
        this._user.updateFbUser(null);
        console.log('fbUser error: ' + err);
      },
      () => {
        this._user.updateFbUser(null);
        console.log('fbUser closed');
      }
      );
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(credential => this._user.updateFbCredential(credential));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  hasRole(role: string, fail: () => any) {
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
