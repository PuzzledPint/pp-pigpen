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
          (click)="selectPuzzleSet(set)"
          style="cursor: pointer"
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
  @Input() public puzzleSets: Observable<PuzzleSet[]> | undefined;

  constructor(public ps: PuzzleService) {
  }

  public ngOnInit() {}

  public setImage(path: string) {
    if (path) {
      return path;
    }
    return "/assets/images/nopolaroid.png";
  }

  public selectPuzzleSet(set: PuzzleSet) {
    this.ps.selectPuzzleSet(set);
  }
}
