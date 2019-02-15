import { Component, OnInit } from "@angular/core";
import { NotifyService } from "src/services/notify.service";
import { UserService } from "src/services/user.service";

@Component({
  selector: "app-home",
  template: `
    <div class="p-grid">
    <div *ngIf="isEditor">
      <app-info-card
        title="Hello Editor"
        text="Click the button to go to your dashboard"
        buttonText="Go"
        link="/editor"
        class="p-col-12 p-lg-4"
      ></app-info-card>
</div>
<div *ngIf="isComms">
      <app-info-card
        title="Hello Comms"
        text="Click the button to go to your dashboard"
        buttonText="Go"
        link="/comms"
        class="p-col-12 p-lg-4"
      ></app-info-card>
</div>
      <div
        *ngFor="let i of Arr(10).fill(1)"
      >
        <app-info-card
          title="Thing"
          text="This is some amazing info about a certain thing"
          buttonText="Find out More"
          link="moreinfo"
          class="p-col-12 p-lg-4"
        ></app-info-card>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  Arr = Array;
  isEditor = false;
  isComms = false;

  constructor(private ns: NotifyService, us: UserService) {
    us.isEditor.subscribe(is => (this.isEditor = is));
    us.isComms.subscribe(is => (this.isComms = is));
  }

  ngOnInit() {
    this.ns.setTitle("Welcome");
  }
}
