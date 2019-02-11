import { Component, OnInit } from '@angular/core';
import { NotifyService } from "src/services/notify.service";

@Component({
  selector: 'view-editor',
  template: `
    <app-puzzle-sets></app-puzzle-sets>
    <app-add-puzzle-set (onAddedSet)="setAdded($event)"></app-add-puzzle-set>
    <!--<app-edit-puzzle-set *ngIf="selectedPuzzleSet"></app-edit-puzzle-set> !-->
  `,
  styles: []
})
export class EditorComponent implements OnInit {

  constructor(private ns: NotifyService) {
    ns.setTitle('Editor');
   }

  ngOnInit() {
  }

  setAdded(e: any) { }
}
