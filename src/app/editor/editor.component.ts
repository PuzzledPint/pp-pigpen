import { Component, OnInit } from '@angular/core';
import { NotifyService } from "src/services/notify.service";
import { PuzzleService, PuzzleSet } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: 'view-editor',
  template: `
    <app-puzzle-sets></app-puzzle-sets>
    <p-button label="Add New Puzzle Set" (onClick)="ps.addPuzzleSet()"></p-button>
    <app-edit-puzzle-set *ngIf="ps.selectedPuzzleSet"></app-edit-puzzle-set>
  `,
  styles: []
})

export class EditorComponent implements OnInit {
  constructor(private ns: NotifyService, public ps: PuzzleService) {
    ns.setTitle('Editor');
   }

  ngOnInit() {
  }
}
