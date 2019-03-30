import { Component, OnInit, Input } from "@angular/core";
import { Puzzle } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-playtesting-puzzle",
  template: `
    <div *ngIf="(puzzle | async) as puz; else noPuzzle">
      <a href="{{ puz.pdf }}" target="_blank"><button pButton type="button" icon="pi pi-download" class="ui-button-success" label="Download the puzzle"></button></a>
      <p-fieldset
        legend="Hints"
        [toggleable]="true"
        [transitionOptions]="'200ms'"
        [collapsed]="true"
      >
        <div *ngFor="let hint of puz.hints">
          <app-playtesting-hint [hint]="hint"></app-playtesting-hint>
        </div>
      </p-fieldset>
    </div>
    <ng-template #noPuzzle>
      No puzzle found
    </ng-template>
  `,
  styles: ["button { margin-bottom:5px; }"]
})
export class PuzzleComponent implements OnInit {
  @Input() public puzzle: Observable<Puzzle> | undefined;

  constructor() {}

  public ngOnInit() {}
}
