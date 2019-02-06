import { User } from 'firebase/app';
import { Observable, Subject } from 'rxjs';

export class PPUser {
  public roles: Array<Roles> = new Array<Roles>();
  public loggedIn: Subject<boolean> = new Subject<boolean>();
  public email = '';
  public name = 'Not Signed In';

  fbUser: User | null = null;

  constructor(fbUser: Observable<User | null>) {
    fbUser.subscribe(
      newFbUser => this.updateFbUser(newFbUser),
      err => this.error(err),
      () => console.log('fbUser closed')
      );
  }

  error(err: any) {
    // what to do when the auth sends an error
    console.error(err);
  }

  updateFbUser(newFbUser: User | null) {
    this.fbUser = newFbUser;

    if (newFbUser) {
      this.loggedIn.next(true);
      this.email = newFbUser.email || 'No Email';
      this.name = newFbUser.displayName || 'No Name';
      // this.roles;
    } else {
      this.loggedIn.next(false);
      this.email = '';
      this.name = 'Not Signed In';
      this.roles = new Array<Roles>();
    }
  }
}
