import { Component, ViewEncapsulation, OnInit, isDevMode } from "@angular/core";
import { UserService } from "src/services/user.service";
import { faderAnimation } from "./animations";

@Component({
  selector: "view-root",
  template: `
    <div class="container">
      <div class="content">
        <app-header></app-header>
        <app-sitewide-alert></app-sitewide-alert>
        <main [@faderAnimation]="safe(o)">
          <router-outlet #o="outlet"></router-outlet>
        </main>
      </div>
      <div class="footer">
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 98vh;
      }
      .content {
        flex: 1 0 auto;
      }
      .footer {
        flex: 0 1 auto;
      }
    `
  ],
  animations: [faderAnimation]
})
export class AppComponent implements OnInit {
  constructor(private auth: UserService) {}
  public ngOnInit(): void {
    if (isDevMode()) {
      // firebase.firestore.setLogLevel('debug');
    }
  }
  public safe(o: { isActivated: any; activatedRoute: any }) {
    return o.isActivated ? o.activatedRoute : "";
  }
}
