import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-roster",
  template: `
    <p-table [value]="puzzle.hints" (onEditComplete)="savePuzzle()">
      <ng-template pTemplate="caption">
        <p>Hints</p>
      </ng-template>
      <ng-template pTemplate="header">
        <tr>
          <th style="width:3rem"></th>
          <th style="width:20%">Title</th>
          <th>Full Hint Text</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-hint let-index="rowIndex">
        <tr [pReorderableRow]="index">
          <td pReorderableRowHandle>
            <i pReorderableRowHandle class="pi pi-bars"></i>
          </td>
          <td pEditableColumn>
            <p-cellEditor>
              <ng-template pTemplate="input">
                <input type="text" [(ngModel)]="hint.title" [ngModelOptions]="{ standalone: true }" />
              </ng-template>
              <ng-template pTemplate="output">
                {{ hint.title }}
              </ng-template>
            </p-cellEditor>
          </td>
          <td pEditableColumn>
            <p-cellEditor>
              <ng-template pTemplate="input">
                <textarea [rows]="3" [(ngModel)]="hint.text" [ngModelOptions]="{ standalone: true }"></textarea>
              </ng-template>
              <ng-template pTemplate="output">
                {{ hint.text }}
              </ng-template>
            </p-cellEditor>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [],
})
export class RosterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
