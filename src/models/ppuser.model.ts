import { User, auth } from 'firebase/app';
import { Subject } from 'rxjs';
import { FSRoles } from './roles.model';
import { AngularFirestoreDocument } from "@angular/fire/firestore";
import { FSUserDoc } from "./fsuserdoc.model";

export class PPUser {
  public roles: FSRoles = FSRoles.none();
  public rolesSubject: Subject<FSRoles> = new Subject<FSRoles>();
  public isSignedIn: Subject<boolean> = new Subject<boolean>();
  public email = '';
  public name = 'Not Signed In';
  public id = '';
  public photo = '';
  public docRef: AngularFirestoreDocument<FSUserDoc> | undefined;
  fbUser: User | undefined;

  constructor() {
  }

  static none(): PPUser {
    return new PPUser();
  }

  updateFbCredential(uc: auth.UserCredential | undefined) {
    //   additionalUserInfo ?: firebase.auth.AdditionalUserInfo | null;
    // credential: firebase.auth.AuthCredential | null;
    // operationType?: string | null;
    this.updateFbUser(uc ? uc.user : null);
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

  updateRoles(newRoles: FSRoles | undefined) {
    if (newRoles) {
      Object.assign(this.roles, newRoles);
    } else {
      this.roles = FSRoles.none();
    }
    this.rolesSubject.next(this.roles);
  }
}
