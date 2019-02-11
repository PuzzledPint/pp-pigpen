import { Component, OnInit } from "@angular/core";
import { PuzzleService } from "src/services/puzzle.service";
import { FSPuzzleSet } from "src/models/fs-puzzle-set.model";

@Component({
  selector: "app-puzzle-sets",
  template: `
    <p-carousel [value]="ps.puzzleSets" numVisible="5">
      <ng-template let-set pTemplate="ps.getSet(set)">
        <span>{{ set }}</span>
        <div
          class="flex-container"
          style="display:flex; flex-wrap: wrap; justify-content: center"
          (click)="selectSet(set)"
        >
          <img
            alt="Set Polaroid"
            src="{{ setImage(details.polaroid) }}"
            height="100px"
            width="100px"
          />
          <span>{{ set.month }}</span>
          <span>{{ set.name }}</span>
        </div>
      </ng-template>
    </p-carousel>
  `,
  styles: []
})
export class PuzzleSetsComponent implements OnInit {
  constructor(public ps: PuzzleService) {}

  ngOnInit() {}

  setImage(path: string) {
    if (path) {
      return path;
    }
    return "/assets/images/nopolaroid.png";
  }

  selectSet(slug: string) {}
}
