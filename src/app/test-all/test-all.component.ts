import { Component, OnInit } from "@angular/core";
import { SentryService } from "src/shared/root/sentry.service";
import { NotifyService } from "src/shared/root/notify.service";

@Component({
  selector: 'view-test-all',
  template: `
    <button p-button (click)="testError()">Test Error Handling</button>

    <app-webmaster-permissions></app-webmaster-permissions>
  `,
  styles: [],
})

export class TestAllComponent implements OnInit {
  constructor(private ss: SentryService, public ns: NotifyService) { }

  public ngOnInit() {
  }

  public testError() {
    this.ss.log("This is a test message", true);
  }

}
