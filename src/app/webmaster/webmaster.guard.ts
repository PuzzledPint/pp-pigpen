import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  Route,
  UrlSegment,
  CanLoad
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { NotifyService } from '../../services/notify.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WebmasterGuard implements CanActivate, CanActivateChild, CanLoad {
constructor(private auth: UserService, private router: Router, private notify: NotifyService) {}

public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  return this.hasAccess();
}

public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  return this.hasAccess();
}

public canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
  return this.hasAccess();
}

private hasAccess() {
  return this.auth.isSignedIn.pipe(
    take(1),
    map(b => b && this.auth.isWebmaster),
    tap(b => {
      if (!b) {
        this.notify.error("Denied", "You must be a Webmaster to access that page!");
        this.router.navigate(["/"]);
        return false;
      }
    })
  );
}
}
