import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { WebmasterService } from "src/services/webmaster.service";

@Component({
  selector: "view-webmaster",
  template: `
    <p-tabView [activeIndex]="tab">
      <p-tabPanel header="Set Admin Permissions">
        <div *ngIf="ws.permissions; else loading">
          <app-webmaster-permissions (save)="SavePermissions()" [userClaims]="ws.permissions!.userClaims"></app-webmaster-permissions>
        </div>
      </p-tabPanel>
      <p-tabPanel header="Other">
        <ng-template pTemplate="content">
          Lazy Loaded Content
        </ng-template>
      </p-tabPanel>
    </p-tabView>
    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [],
})
export class WebmasterComponent implements OnInit, OnDestroy {
  public tab = 0;
  private routeSub!: Subscription;

  constructor(private route: ActivatedRoute, public ws: WebmasterService) {}

  public ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      switch (params.get("tab")) {
        case "permissions": {
          this.tab = 0;
          break;
        }
        default: {
          this.tab = 0;
        }
      }
    });
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  public SavePermissions() {
    this.ws.savePermissions();
  }
}
