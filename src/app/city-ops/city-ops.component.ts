import { Component, OnInit } from "@angular/core";
import { MenuItem } from 'primeng/api';

@Component({
  selector: "view-city-ops",
  template: `
  <p-tabMenu [model]="items"></p-tabMenu>
  <router-outlet>
`,
  styles: [],
})
export class CityOpsComponent implements OnInit {
  public items: MenuItem[] | undefined;

  constructor() { }

  public ngOnInit() {
    this.items = [
      { label: "Roster", icon: "fa fa-users", routerLink: ["roster"] },
      { label: "Cities", icon: "fa fa-globe", routerLink: ["cities"] },
    ];
  }
}
