import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { NotifyService } from '../../services/notify.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EditorGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: UserService,
    private router: Router,
    private notify: NotifyService
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> {
    return this.auth.isSignedIn.pipe(
      take(1),
      map(b => b && this.auth.isEditor),
      tap(b => {
        if (!b) {
          this.notify.error("Denied", "You must be on the HQ Editors team to access that page!");
          this.router.navigate(["/"]);
          return false;
        }
      })
    );
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
