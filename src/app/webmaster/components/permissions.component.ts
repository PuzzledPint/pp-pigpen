import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { WebmasterService } from '../webmaster.service';

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

        <tr *ngFor="let row of ws.permissions?.userClaims; let i = index">
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
    <p-button label="Add Row" (onClick)="ws.addUserClaim()"></p-button>
    <p-button label="Save" (onClick)="ws.savePermissions()"></p-button>
  `,
  styles: [],
})
export class PermissionsComponent implements OnInit {
  constructor(public ws: WebmasterService) { }

  public ngOnInit() { }
}
