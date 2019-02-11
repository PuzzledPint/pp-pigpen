import { Component, OnInit, Output } from "@angular/core";
import { PuzzleService, PuzzleSet } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-puzzle-sets",
  template: `
    <p-carousel [value]="puzzleSets | async" numVisible="5">
      <ng-template let-set pTemplate="set">
        <div
          class="ui-grid ui-grid-responsive"
          (click)="ps.selectPuzzleSet(set)"
        >
        <div class="ui-grid-row">
        <div class="ui-grid-col-12">
              <img
                alt="Set Polaroid"
                src="{{ setImage(set.polaroid) }}"
                height="100px"
                width="100px"
              />
            </div>
          </div>
          <div class="ui-grid-row">
          <span class="p-col-12">{{ set.month }}</span>
          </div>
          <div class="ui-grid-row">
          <span class="p-col-12">{{ set.name }}</span>
          </div>
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
