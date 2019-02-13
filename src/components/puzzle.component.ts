import { Component, OnInit, Input } from '@angular/core';
import { Puzzle } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-puzzle',
  template: `
    <div *ngIf="(puzzle | async) as puz; else noPuzzle">
    {{ puz.name }}
    {{ puz.type }}
    {{ puz.pdf }}
    <div *ngFor="let hint of (puzzle | async).hints">
    {{ hint.title }}       {{ hint.text }}
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
