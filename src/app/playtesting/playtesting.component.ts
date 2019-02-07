import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/services/auth.service";
import { NotifyService } from "src/services/notify.service";

@Component({
  selector: "view-playtesting",
  template: `
    <div *ngIf="!(auth.isSignedIn | async)">
    <p-card>Thank you for your interest in playtesting!</p-card>
    <p-card>
        In order to playtest you now need to log in. Certain fields will be
        saved across tests, like your city, this will allow you to save
        keystrokes compared to the old Google Form. Also, you can come back any
        time to see, edit, or add to your testing notes.</p-card
      >
      <p-card
        >For now, we only support Google Authentication to keep it simple (no
        additional user names or passwords to manage), and because, as many of
        you are cherished Game Control volunteers, you will already have them
        from using Google Drive.</p-card
      >
      <p-card
        >Please sign in using the button on the top right now. Thanks!</p-card
      >
    </div>

    <div *ngIf="auth.isSignedIn | async">

    <p-card>Thank you for your interest in playtesting!</p-card>



    </div>
  `,
  styles: []
})
export class PlaytestingComponent implements OnInit {
  constructor(public auth: AuthService, private ns: NotifyService) {}

  ngOnInit() {
    this.ns.setTitle("Playtesting");
  }
}
