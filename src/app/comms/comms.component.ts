import { Component, OnInit } from "@angular/core";
import { NotifyService } from "src/services/notify.service";
import { InfoService, Info } from "src/services/info.service";

@Component({
  selector: "view-comms",
  template: `
    <div *ngIf="info" class="p-grid">
      <h3 class="p-col-12">
        Alert Header
      </h3>
      <div class="p-col-12">
      <textarea pInputTextarea
        [(ngModel)]="info.alertHeader"
        [rows]="1" [cols]="80"
        (blur)="info.save(ns)"
      ></textarea>
      </div>
      <h3 class="p-col-12">
        Sitewide Footer
      </h3>
      <div class="p-col-12">
      <textarea pInputTextarea
        [(ngModel)]="info.footer"
        [rows]="2" [cols]="80"
        (blur)="info.save(ns)"
      ></textarea>
      </div>
      <p-toolbar class="p-col-12 p-lg-12">
        <div class="ui-toolbar-group-right">
          <p-button
            label="Save Website Info"
            (click)="info.save(ns)"
          ></p-button>
        </div>
      </p-toolbar>
    </div>
  `,
  styles: []
})
export class CommsComponent implements OnInit {
  public info: Info | undefined;

  constructor(public ns: NotifyService, public is: InfoService) {
    ns.setTitle("Comms");
  }

  public ngOnInit() {
      this.info = this.is.getInfo();
  }
}
