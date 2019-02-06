import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { PPUser } from 'src/models/ppuser.model';

@Component({
  selector: 'app-user-auth',
  template: `
    <div *ngIf="user.loggedIn | async; else showLogin">
      <p>Hello {{ user.name }}</p>
      <p>{{ user.email }}</p>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #showLogin>
      <p>Not Signed In</p>
      <button (click)="login()">Sign In</button>
    </ng-template>
  `,
  styles: []
})
export class UserAuthComponent implements OnInit {
  user: PPUser;

  constructor(public authService: AuthService) {
    this.user = authService.user;
  }

  ngOnInit() {}

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
}
