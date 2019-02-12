import { Component, OnInit, Input } from '@angular/core';
import { Puzzle } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-puzzle',
  template: `
    <div *ngFor="let hint in (puzzle | async).hints">
    {{ hint.title }}       {{ hint.text }}
    </div>

  `,
  styles: []
})
export class PuzzleComponent implements OnInit {
  @Input() puzzle: Observable<Puzzle> | undefined;

  constructor() { }

  ngOnInit() {
  }

}
