import { Component, OnInit, Input } from "@angular/core";
import { Puzzle } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-puzzle",
  template: `
    <div *ngIf="(puzzle | async) as puz; else noPuzzle">
      <h3>
        Download the puzzle <a href="{{ puz.pdf }}" target="_blank">here</a>
      </h3>
      <p-fieldset
        legend="Hints"
        [toggleable]="true"
        [transitionOptions]="'200ms'"
        [collapsed]="true"
      >
        <div *ngFor="let hint of puz.hints">
          <app-hint [hint]="hint"></app-hint>
        </div>
      </p-fieldset>
    </div>
    <ng-template #noPuzzle>
      No puzzle found
    </ng-template>
  `,
  styles: []
})
export class PuzzleComponent implements OnInit {
  @Input() public puzzle: Observable<Puzzle> | undefined;

  constructor() {}

  public ngOnInit() {}
}
