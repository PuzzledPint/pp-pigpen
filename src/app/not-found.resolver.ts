
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { NotifyService } from "src/services/notify.service";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class NotFoundResolver implements Resolve<void> {
  constructor(private ns: NotifyService, private router: Router) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    console.log("RouteNotFound:", route.url.toString());
    // tslint:disable-next-line:max-line-length
    this.ns.error("URL Not Found", "Sorry, that URL doesn't exist on this server.  Please email webmasters@puzzledpint.org to report a bug.");
    this.router.navigateByUrl('/');
  }

}
