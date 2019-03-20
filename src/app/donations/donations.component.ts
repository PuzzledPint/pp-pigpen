import { Component, OnInit } from "@angular/core";
import { MenuItem } from 'primeng/api';

@Component({
  selector: "view-donations",
  template: `
  <p-tabMenu [model]="items"></p-tabMenu>
  <router-outlet>
`,
  styles: [],
})
export class DonationsComponent implements OnInit {
  public items: MenuItem[] | undefined;

  constructor() { }

  public ngOnInit() {
    this.items = [
      { label: "Make a Donation", icon: "fa fa-users", routerLink: ["make"] },
      { label: "See the Donor List", icon: "fa fa-globe", routerLink: ["list"] },
    ];
  }
}
