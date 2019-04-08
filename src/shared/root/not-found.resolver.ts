
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { NotifyService } from "src/shared/root/notify.service";
import { Observable } from "rxjs";
import { SentryService } from "src/shared/root/sentry.service";

@Injectable({providedIn: 'root'})
export class NotFoundResolver implements Resolve<void> {
  constructor(private ns: NotifyService, private router: Router, private ss: SentryService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    this.ss.log("RouteNotFound:" + route.url.toString(), true);
    // tslint:disable-next-line:max-line-length
    this.ns.error("URL Not Found", "Sorry, that URL doesn't exist on this server.  Please email webmasters@puzzledpint.org to report a bug.");
    this.router.navigateByUrl('/');
  }

}
