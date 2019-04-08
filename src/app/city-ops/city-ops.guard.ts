import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, CanLoad, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";

import { NotifyService } from "src/shared/root/notify.service";
import { map, tap, take } from "rxjs/operators";
import { UserService } from 'src/shared/root/user.service';

@Injectable({
  providedIn: "root",
})
export class CityOpsGuard implements CanActivate, CanActivateChild, CanLoad {
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
      map(b => b && this.auth.isCityOps),
      tap(b => {
        if (!b) {
          this.notify.error("Denied", "You must be on the HQ City Operations team to access that page!");
          this.router.navigate(["/"]);
          return false;
        }
      })
    );
  }
}
