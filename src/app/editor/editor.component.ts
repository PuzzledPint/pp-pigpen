import { Component, OnInit } from "@angular/core";
import { NotifyService } from "src/services/notify.service";
import { PuzzleService } from "src/services/puzzle.service";

@Component({
  selector: "view-editor",
  template: `
    <app-puzzle-sets [puzzleSets]="ps.puzzleSets"></app-puzzle-sets>
    <p-toolbar>
      <div class="ui-toolbar-group-right">
        <p-button
          label="Add New Puzzle Set"
          (onClick)="ps.addPuzzleSet()"
        ></p-button>
      </div>
    </p-toolbar>
    <app-editor-edit-puzzle-set></app-editor-edit-puzzle-set>
  `,
  styles: []
})
export class EditorComponent implements OnInit {
  constructor(private ns: NotifyService, public ps: PuzzleService) {
    ns.setTitle("Editor");
  }

  public ngOnInit() {}
}
