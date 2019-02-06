import { Injectable } from '@angular/core';
import { PPUser } from 'src/models/ppuser.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: PPUser;

  get user(): PPUser {
    return this._user;
  }

  constructor(public afAuth: AngularFireAuth) {
    this._user = new PPUser(afAuth.user);
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  hasRole(role: Roles, fail: () => any) {
    return this._user.loggedIn.pipe(
      take(1),
      map(loggedIn => this._user.roles.includes(role)),
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
