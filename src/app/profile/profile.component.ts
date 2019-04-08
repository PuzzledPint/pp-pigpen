// tslint:disable: max-line-length
import { Component, OnInit } from "@angular/core";
import { NotifyService } from "src/shared/root/notify.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from 'src/shared/root/user.service';

class Info {
  public title = "";
  public teaser = "";
  public buttonText = "";
  public slug = "";
  public fulltext = "";
}

@Component({
  selector: "app-profile",
  template: `
    <div>
      <p-card
        header="User Profile"
        [subheader]="userName"
        styleClass="ui-card-shadow"
      >
        <p-header>
          <img
            [src]="userPhoto"
            style="width:128px;height:128px;"
            [alt]="userPhoto"
          />
        </p-header>
        <span class="ui-card-content">EMail: {{ userEmail }}</span>
        <p-footer>
          <span>Id: {{ this.us.id }}</span>
        </p-footer>
      </p-card>
    </div>
    <div *ngIf="this.us.isCityOps">
      <p-card header="You are City Ops" styleClass="ui-card-shadow">
        <a class="ui-card-content" routerLink="/city-ops">Go to your dashboard</a>
      </p-card>
    </div>
    <div *ngIf="this.us.isEditor">
      <p-card header="You are an Editor" styleClass="ui-card-shadow">
        <a class="ui-card-content" routerLink="/editor">Go to your dashboard</a>
      </p-card>
    </div>
    <div *ngIf="this.us.isComms">
      <p-card header="You are Comms" styleClass="ui-card-shadow">
        <a class="ui-card-content" routerLink="/comms">Go to your dashboard</a>
      </p-card>
    </div>
    <div *ngIf="this.us.isShowrunner">
      <p-card header="You are a Showrunner" styleClass="ui-card-shadow">
        <a class="ui-card-content" routerLink="/showrunner">Go to your dashboard</a>
      </p-card>
    </div>
    <div *ngIf="this.us.isWebmaster">
      <p-card header="You are a Webmaster" styleClass="ui-card-shadow">
        <a class="ui-card-content" routerLink="/webmaster">Go to your dashboard</a>
      </p-card>
    </div>
    <div *ngIf="this.us.GCCity">
      <p-card header="You are Game Control" [subheader]="us.GCCity" styleClass="ui-card-shadow">
        <a class="ui-card-content" routerLink="/city/{{us.GCCity}}">Go to your dashboard</a>
      </p-card>
    </div>
  `,
  styles: []
})
export class ProfileComponent implements OnInit {
  public userName = "";
  public userId = "";
  public userEmail = "";
  public userPhoto = "";

  constructor(
    private ns: NotifyService,
    public us: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.us.isSignedIn.subscribe(foo => this.setSelected(this.us.id));
  }

  public ngOnInit() {
    this.ns.setTitle("Profile");

    this.route.paramMap.subscribe(params =>
      this.setSelected(params.get("uid"))
    );
  }

  public setSelected(uid: string | null) {
    if (!uid) {
      uid = this.us.id;
    }
    // const newInfo = this.staticInfos.find(info => info.slug === uid);
    this.userId = uid;
    this.userName = this.us.name;
    this.userEmail = this.us.email;
    this.userPhoto = this.us.photo;
  }
}

// TODO Refector this into a component that shows user info and bind the current user to it.
