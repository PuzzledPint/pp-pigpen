import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FSUserClaimsEntry } from "src/models/fs-admin-permissions";

@Component({
  selector: "app-webmaster-permissions",
  template: `
    <table>
      <tr>
        <th>User ID</th>
        <th>E-Mail</th>

        <th>CityOps</th>
        <th>Comms</th>
        <th>Editor</th>
        <th>Showrunner</th>
        <th>Webmaster</th>
      </tr>

        <tr *ngFor="let row of userClaims; let i = index">
          <td>
            <i>{{ row.uid }}</i>
          </td>
          <td>
            <input type="text" pInputText [(ngModel)]="row.email" [ngModelOptions]="{ standalone: true }"/>
          </td>
          <td>
            <p-checkbox [(ngModel)]="row.CityOps" binary="true" [ngModelOptions]="{ standalone: true }"></p-checkbox>
          </td>
          <td>
            <p-checkbox [(ngModel)]="row.Comms" binary="true" [ngModelOptions]="{ standalone: true }"></p-checkbox>
          </td>
          <td>
            <p-checkbox [(ngModel)]="row.Editor" binary="true" [ngModelOptions]="{ standalone: true }"></p-checkbox>
          </td>
          <td>
            <p-checkbox [(ngModel)]="row.Showrunner" binary="true" [ngModelOptions]="{ standalone: true }"></p-checkbox>
          </td>
          <td>
            <p-checkbox [(ngModel)]="row.Webmaster" binary="true" [ngModelOptions]="{ standalone: true }"></p-checkbox>
          </td>
        </tr>
    </table>
    <p-button label="Add Row" (onClick)="handleAdd()"></p-button>
    <p-button label="Save" (onClick)="handleSave()"></p-button>
  `,
  styles: [],
})
export class PermissionsComponent implements OnInit {
  @Input() public userClaims!: FSUserClaimsEntry[];
  @Output() public save = new EventEmitter();
  @Output() public add = new EventEmitter();

  constructor() { }

  public ngOnInit() { }

  public handleSave() {
    this.save.emit();
  }

  public handleAdd() {
    this.add.emit();
  }

}
