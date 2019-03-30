import { Component, OnInit, AfterViewInit } from "@angular/core";
import { InfoService, Info } from "src/services/info.service";
import { Observable } from "rxjs";
import { FSInfo } from "src/models/fs-info.model";
import { NotifyService } from "src/services/notify.service";

@Component({
  selector: "app-sitewide-alert",
  template: `
  <p-message *ngIf="info?.alertHeader" severity="warn" [text]="info?.alertHeader"></p-message>
  `,
  styles: []
})
export class SitewideAlertComponent implements OnInit {
  public info: Info;

  constructor(infoService: InfoService) {
    this.info = infoService.getInfo();
  }

  public ngOnInit() {}
}
