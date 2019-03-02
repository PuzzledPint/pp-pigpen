import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { NotifyService } from '../../services/notify.service';

@Injectable({
  providedIn: 'root'
})

export class CommsGuard implements CanActivate {
  constructor(
    private auth: UserService,
    private router: Router,
    private notify: NotifyService
  ) {}

  public async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.auth.isComms) {
      return true;
    }
    const signedIn = await this.auth.isSignedIn;
    if (!this.auth.isComms) {
      this.notify.error("Denied", "You must be on the communications team to access that page!");
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
