import { Injectable } from '@angular/core';
import { PPUser } from 'src/models/ppuser.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase/app';
import { take, tap, map } from 'rxjs/operators';
import { FirebaseService } from "./firebase.service";
import { AnyRole } from "src/models/roles.model";
import { Subscription, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _user: PPUser = PPUser.none();
  private rolesSub: Subscription | undefined = undefined;

  get user(): PPUser {
    return this._user;
  }

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

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(credential => this.afterAuth(credential));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  afterAuth(uc: auth.UserCredential) {
    this._user.updateFbCredential(uc);
    this.initLinkedDocs();
  }

  updateFbUser(newUser: User | null) {
    this._user.updateFbUser(newUser);
    if (newUser) {
      this.initLinkedDocs();
    } else {
      if (this.rolesSub) { this.rolesSub.unsubscribe(); }
    }

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
}
