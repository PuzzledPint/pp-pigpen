import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthService {
  public $user: Subject<User>;
  private _user: User;

  error(arg0: string): any {
    throw new Error('Method not implemented.');
  }

  get user(): User { return this._user; }
  set user(u: User) { this._user = u; this.$user.next(u);  }
}
