import { Component, OnInit } from "@angular/core";
import { MenuItem } from 'primeng/api';
import { WebmasterService } from './webmaster.service';

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
