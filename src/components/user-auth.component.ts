import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/services/auth.service";
import { PPUser } from "src/models/ppuser.model";

@Component({
  selector: "app-user-auth",
  template: `
    <div
      *ngIf="(user.loggedIn | async); else showLogin"
      class="p-grid" style=""
    >
      <div class="p-col-11" style="margin-bottom:0; margin-top:0; font-size:16px; text-align:right">
        <p style="margin-top:0; margin-bottom:0"
        >
          {{ user.email }}
        </p>
      </div>
      <div class="p-col-11">
        <p-button (click)="signOut()" label="Sign Out" style="float:right"></p-button>
      </div>
    </div>
    <ng-template #showLogin>
    <div class="p-col-11" style="margin-bottom:0; margin-top:0; font-size:16px; text-align:right">
    <p style="margin-top:0; margin-bottom:0"
    >
      Not Signed In
    </p>
  </div>
  <div class="p-col-11">
    <p-button (click)="signIn()" label="Sign In" style="float:right"></p-button>
  </div>
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

  signIn() {
    this.authService.login();
  }
  signOut() {
    this.authService.logout();
  }
}
