import { Component, OnInit } from "@angular/core";
import { WebmasterService } from "src/services/webmaster.service";
import { MenuItem } from 'primeng/api';

@Component({
  selector: "view-webmaster",
  template: `
  <p-tabMenu [model]="items"></p-tabMenu>
  <router-outlet>
  `,
  styles: [],
})
export class WebmasterComponent implements OnInit {
  public items: MenuItem[] | undefined;

  constructor(public ws: WebmasterService) {}

  public ngOnInit() {
    this.items = [
      { label: "Permissions", icon: "fa fa-users", routerLink: ["permissions"] },
    ];
  }
}
