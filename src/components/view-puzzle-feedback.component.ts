import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import {
  PlaytestFeedbackAugmented,
  PlaytestService
} from "src/services/playtest.service";
import { NotifyService } from "src/services/notify.service";
import { Observable, Subscription } from "rxjs";
import { Puzzle, PuzzleService } from "src/services/puzzle.service";

@Component({
  selector: "app-view-puzzle-feedback",
  template: `
    <p-fieldset
      [legend]="fieldSetName()"
      [toggleable]="true"
      [transitionOptions]="'200ms'"
      [collapsed]="true"
    >
      <div *ngIf="puzzle; else noPuzzle">
        <h3>Name: {{ puzzle.name }}</h3>
        <div
          *ngIf="
            (playtestFeedback$ | async) as playtestFeedback;
            else noFeedback
          "
        >
          <div *ngFor="let report of playtestFeedback">
            <p-card
              [header]="makeHeader(report)"
              [subheader]="makeSubheader(report)"
              styleClass="ui-card-shadow"
            >
              <div *ngIf="report.errors">
                <h3>Errors</h3>
                <span>{{ report.errors }}</span>
                <hr />
              </div>
              <div *ngIf="report.visual">
                <h3>Errors</h3>
                <span>{{ report.visual }}</span>
                <hr />
              </div>
              <div *ngIf="report.general">
                <span>{{ report.general }}</span>
              </div>
              <p-footer>
                <p-button
                  label="Changing Status Goes Here (TODO)"
                  icon="pi pi-save"
                  iconPos="right"
                ></p-button>
              </p-footer>
            </p-card>
          </div>
        </div>
        <ng-template #noFeedback>
          <h3>Loading Feedback...</h3>
        </ng-template>
      </div>
      <ng-template #noPuzzle>
        <h3>Loading Puzzle...</h3>
      </ng-template>
    </p-fieldset>
  `,
  styles: []
})
export class ViewPuzzleFeedbackComponent implements OnInit, OnDestroy {
  public puzzle: Puzzle | undefined;
  private spSub: Subscription;

  public playtestFeedback$: Observable<PlaytestFeedbackAugmented[]> | undefined;

  constructor(
    private pts: PlaytestService,
    public ns: NotifyService,
    private ps: PuzzleService
  ) {
    this.spSub = ps.selectedPuzzle.subscribe(newPuzzle => {
      this.puzzle = newPuzzle;
      if (newPuzzle) this.playtestFeedback$ = this.pts.getPlaytestFeedbackAugmented(newPuzzle);
    });
  }

  public ngOnInit() {}

  public ngOnDestroy(): void {
    this.spSub.unsubscribe();
  }

  public makeHeader(report: PlaytestFeedbackAugmented) {
    let v = report.version;
    if (!v.startsWith("v") && !v.startsWith("V")) {
      v = "v-" + v;
    }
    const solved = report.solved ? "Solved" : "Unsolved";
    return `${report.userId} ${solved} ${v}`;
  }

  public makeSubheader(report: PlaytestFeedbackAugmented) {
    let v = report.version;
    if (!v.startsWith("v") && !v.startsWith("V")) {
      v = "v-" + v;
    }
    const solved = report.solved ? "Solved" : "Unsolved";
    const date = report.lastChanged;
    return `testers:${report.numPlaytesters} mins:${report.solveMinutes} d:${
      report.difficulty
    } f:${report.fun} ${date}`;
  }

  public fieldSetName(): string {
    return this.puzzle ? 'Playtest Feedback for ' + this.puzzle.name : 'Loading Puzzle...';
  }
}
