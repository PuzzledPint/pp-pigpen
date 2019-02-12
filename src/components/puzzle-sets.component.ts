import { Component, OnInit, Output, Input } from "@angular/core";
import { PuzzleService, PuzzleSet } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-puzzle-sets",
  template: `
    <p-carousel [value]="puzzleSets | async" numVisible="5"
      headerText="Select Puzzle Set">
      <ng-template let-set pTemplate="set">
        <div
          (click)="ps.selectPuzzleSet(set)"
        >
              <img
                alt="Set Polaroid"
                src="{{ setImage(set.polaroid) }}"
                height="100px"
                width="100px"
                style="margin-left: auto; margin-right: auto; display: block"
              />
          <h3 style="text-align:center">{{ set.month }}</h3>
          <h3 style="text-align:center">{{ set.name }}</h3>
        </div>
      </ng-template>
    </p-carousel>
  `,
  styles: []
})
export class PuzzleSetsComponent implements OnInit {
  @Input() puzzleSets: Observable<PuzzleSet[]> | undefined;

  constructor(public ps: PuzzleService) {
  }

  ngOnInit() {}

  setImage(path: string) {
    if (path) {
      return path;
    }
    return "/assets/images/nopolaroid.png";
  }
}
