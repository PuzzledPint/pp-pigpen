import { Component, ViewEncapsulation, OnInit, isDevMode } from "@angular/core";
import { UserService } from "src/services/user.service";
import { fadeAnimation } from "./animations";

@Component({
  selector: "view-root",
  template: `
    <div class="p-grid" style="background-color:#FAFAFA">
      <div
        class="p-col-12"
        [ngStyle]="{
          height: '12vh',
          'background-color': '#FAFAFA',
          'margin-bottom': '0px'
        }"
      >
        <app-header></app-header>
      </div>
      <div class="p-col-12">
        <p-scrollPanel [style]="{ height: '76vh' }" styleClass="custombar2">
          <app-sitewide-alert></app-sitewide-alert>
          <main [@fadeAnimation]="safe(o)">
            <router-outlet #o="outlet"></router-outlet>
          </main>
        </p-scrollPanel>
      </div>
      <div
        class="p-col-12"
        [ngStyle]="{ height: '8vh', 'background-color': '#F0F0F0' }"
      >
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: [],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  constructor(private auth: UserService) {}
  ngOnInit(): void {
    if (isDevMode()) {
      // firebase.firestore.setLogLevel('debug');
    }
  }
  safe(o: { isActivated: any; activatedRoute: any; }) {
    return o.isActivated ? o.activatedRoute : '';
  }
}
