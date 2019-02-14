import { Component, OnInit, Input } from '@angular/core';
import { Puzzle } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-puzzle',
  template: `
    <div *ngIf="(puzzle | async) as puz; else noPuzzle">
    <h3>Download the puzzle <a href="{{ puz.pdf }}" target="_blank">here</a></h3>
    <div *ngFor="let hint of puz.hints">
      <app-hint [hint]="hint"></app-hint>
    </div>
    </div>
    <ng-template #noPuzzle>
      No puzzle found
      </ng-template>
  `,
  styles: []
})
export class PuzzleComponent implements OnInit {
  @Input() puzzle: Observable<Puzzle> | undefined;

  constructor() { }

  ngOnInit() {
  }

}
