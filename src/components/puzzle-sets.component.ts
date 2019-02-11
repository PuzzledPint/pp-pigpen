import { Component, OnInit, Output } from "@angular/core";
import { PuzzleService, PuzzleSet } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-puzzle-sets",
  template: `
    <p-carousel [value]="puzzleSets | async" numVisible="5">
      <ng-template let-set pTemplate="set">
        <div
          class="flex-container"
          style="display:flex; flex-wrap: wrap; justify-content: center"
          (click)="ps.selectPuzzleSet(set)"
        >
          <img
            alt="Set Polaroid"
            src="{{ setImage(set.polaroid) }}"
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
  puzzleSets: Observable<PuzzleSet[]>;

  constructor(public ps: PuzzleService) {
    this.puzzleSets = ps.puzzleSets;
  }

  ngOnInit() {}

  setImage(path: string) {
    if (path) {
      return path;
    }
    return "/assets/images/nopolaroid.png";
  }
}
