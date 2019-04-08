import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { NotifyService } from "src/shared/root/notify.service";
import { Router } from "@angular/router";
import { UserService } from './user.service';

@Component({
  selector: "app-user-auth",
  template: `
  <p-toolbar>
    <div class="ui-toolbar-group-right">
      <div *ngIf="(us.isSignedIn | async); else showLogin">
        <p-splitButton icon="pi pi-lock" (onClick)="us.signOut()" [model]="items"></p-splitButton>
      </div>
      <ng-template #showLogin>
        <p-button (click)="us.signIn()" label="Sign In"></p-button>
      </ng-template>
    </div>
  </p-toolbar>
  `,
  styles: []
})
export class UserAuthComponent implements OnInit {
  public items: MenuItem[] = [];
  public email = "";

  constructor(public us: UserService, public notify: NotifyService, private router: Router) {
    this.items = [{
      label: "", separator: true
    },
    {
      label: "Sign Out",
      icon: "pi pi-unlock",
      command: () => {
        this.us.signOut();
        location.replace("/");
      }
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => {
        this.profile();
      }
    }];

    us.isSignedIn.subscribe(
      signedIn => {
        this.items[0].label = us.email;
      }
    );
  }

  public ngOnInit(): void {}

  public profile() {
    this.router.navigateByUrl("/profile");
  }
}
