import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs";
import { NotifyService } from "src/shared/root/notify.service";
import { Info, InfoService } from 'src/app/info/info.service';

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
