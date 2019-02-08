import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../services/auth.service';
import { NotifyService } from '../../services/notify.service';

@Injectable({
  providedIn: 'root'
})

export class WebmasterGuard implements CanActivate {
  constructor(
    private auth: UserService,
    private router: Router,
    private notify: NotifyService
  ) {}

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean {
  return this.auth.hasRole(this.auth.isWebmaster, () => {
    this.notify.error('Denied', 'You must be a webmaster to access that page!');
    this.router.navigate(['/']);
  });
}
}
