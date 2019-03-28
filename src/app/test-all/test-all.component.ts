import { Component, OnInit } from '@angular/core';
import { SentryService } from "src/services/sentry.service";

@Component({
  selector: 'view-test-all',
  template: `
    <button p-button (click)="testError()">Test Error Handling</button>
  `,
  styles: []
})
export class TestAllComponent implements OnInit {

  constructor(private ss: SentryService) { }

  public ngOnInit() {
  }

  public testError() {
    this.ss.log("This is a test message", true);
  }
}
