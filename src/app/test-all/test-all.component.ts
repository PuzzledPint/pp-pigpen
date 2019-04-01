import { Component, OnInit } from '@angular/core';
import { SentryService } from "src/services/sentry.service";
import { NotifyService } from "src/services/notify.service";
import { FSUserClaimsEntry } from "src/models/fs-admin-permissions";

@Component({
  selector: 'view-test-all',
  template: `
    <button p-button (click)="testError()">Test Error Handling</button>

    <app-webmaster-permissions (save)="SavePermissions()" [userClaims]="userClaims"></app-webmaster-permissions>
  `,
  styles: []
})
export class TestAllComponent implements OnInit {
  public userClaims: FSUserClaimsEntry[] = [
    {
      uid: "",
      email: "person@org.org",

      CityOps: true,
      Comms: false,
      Editor: true,
      Showrunner: true,
      Webmaster: true,
    }
  ];

  constructor(private ss: SentryService, public ns: NotifyService) { }

  public ngOnInit() {
  }

  public testError() {
    this.ss.log("This is a test message", true);
  }

  public SavePermissions() { this.ns.error("Saved", "Permissions"); }
}
