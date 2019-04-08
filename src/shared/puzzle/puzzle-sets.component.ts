import { Component, OnInit, Output, Input } from "@angular/core";
import { Observable } from "rxjs";
import { PuzzleSet, PuzzleService } from './puzzle.service';

@Component({
  selector: "app-puzzle-sets",
  template: `
    <p-carousel [value]="puzzleSets | async"
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
