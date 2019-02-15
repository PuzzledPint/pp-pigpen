import { Injectable } from '@angular/core';
import { take, tap, map } from 'rxjs/operators';

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

export class EditorGuard implements CanActivate {
  constructor(
    private auth: UserService,
    private router: Router,
    private notify: NotifyService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.hasRole(this.auth.isEditor, () => {
      this.notify.error('Denied', 'You must be an editor to access that page!');
      this.router.navigate(['/']);
    });
  }
}
