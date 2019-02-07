import { User, auth } from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { Roles } from './roles.model';

export class PPUser {
  public roles: Roles = Roles.none();
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public email = '';
  public name = 'Not Signed In';

  fbUser: User | null = null;

  constructor() {
    this.updateFbCredential(null);
  }

  static none(): PPUser {
    return new PPUser();
  }

  updateFbCredential(uc: auth.UserCredential | null) {
    //   additionalUserInfo ?: firebase.auth.AdditionalUserInfo | null;
    // credential: firebase.auth.AuthCredential | null;
    // operationType?: string | null;
    this.updateFbUser(uc ? uc.user : null);
  }

  updateFbUser(newFbUser: User | null) {
    this.fbUser = newFbUser;

    if (newFbUser) {
      this.loggedIn.next(true);
      this.email = newFbUser.email || 'No Email';
      this.name = newFbUser.displayName || 'No Name';
    } else {
      this.loggedIn.next(false);
      this.email = '';
      this.name = 'Not Signed In';
      this.roles = Roles.none();
    }
  }

  updateRoles(newRoles: Roles) {
    this.roles = newRoles;
  }
}
