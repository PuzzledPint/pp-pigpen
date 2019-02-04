import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { NotifyService } from '../../services/notify.service';

@Injectable({
  providedIn: 'root'
})

export class EditorsGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.$user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn || !this.auth.user.hasRole(Roles.EDITORS)) {
          console.log('access denied');
          this.notify.error('You must be logged in to access that page!');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
