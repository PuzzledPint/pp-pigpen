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
import { DatePipe } from "@angular/common";

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
        <div
          *ngIf="
            (playtestFeedback$ | async) as playtestFeedback;
            else noFeedback
          "
          class="p-grid"
        >
          <div *ngFor="let report of playtestFeedback">
            <p-card
              [subheader]="
                makeSubheader(report) +
                (report.lastChanged.toDate() | date: 'yyyy-MM-dd HH:mm')
              "
              styleClass="ui-card-shadow"
              p-col-12
              p-md-6
              p-lg-4
              p-xl-3
            >
              <p-header>
                <p-button
                  *ngIf="report.solved; else unsolved"
                  label="Solved"
                  icon="pi pi-check"
                  styleClass="ui-button-success"
                ></p-button>
                <ng-template #unsolved>
                  <p-button
                    label="Unsolved"
                    icon="pi pi-times"
                    styleClass="ui-button-danger"
                  ></p-button>
                </ng-template>
                <p-button
                  label="{{ report.userId }}"
                  styleClass="ui-button-secondary"
                ></p-button>
                <div class="ui-toolbar-group-right">
                  <button
                    pButton
                    type="button"
                    [label]="makeVersion(report)"
                    class="ui-button-info"
                  ></button>
                </div>
              </p-header>
              <div *ngIf="report.errors">
              <b>Errors: </b>
              <span>{{ report.errors }}</span>
                <hr />
              </div>
              <div *ngIf="report.visual">
              <b>Visual: </b>
              <span>{{ report.visual }}</span>
                <hr />
              </div>
              <div *ngIf="report.general">
                <span>{{ report.general }}</span>
              </div>
              <p-footer>
                <app-email-button [subject]="'Question about your feedback on '+puzzle.name" [toUser]="report.userId"></app-email-button>
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

  public makeVersion(report: PlaytestFeedbackAugmented): string {
    let v = report.version;
    if (!v.startsWith("v") && !v.startsWith("V")) {
      v = "v-" + v;
    }
    return v;
  }

  public makeSubheader(report: PlaytestFeedbackAugmented) {
    let v = report.version;
    if (!v.startsWith("v") && !v.startsWith("V")) {
      v = "v-" + v;
    }
    const solved = report.solved ? "Solved" : "Unsolved";
    const date = report.lastChanged;
    return `
      [${report.solveMinutes} mins]
      [${report.numPlaytesters} solvers]
      D:${"⭐".repeat(report.difficulty)}
      F:${"⭐".repeat(report.fun)} `;
  }

  public fieldSetName(): string {
    return this.puzzle
      ? "Playtest Feedback for " + this.puzzle.name
      : "Loading Puzzle...";
  }
}
