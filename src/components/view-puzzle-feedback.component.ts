import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { PlaytestFeedbackAugmented, PlaytestService } from "src/services/playtest.service";
import { NotifyService } from "src/services/notify.service";
import { Observable, Subscription } from "rxjs";
import { Puzzle, PuzzleService } from "src/services/puzzle.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-view-puzzle-feedback",
  template: `
    <p-fieldset [legend]="fieldSetName()" [toggleable]="true" [transitionOptions]="'200ms'" [collapsed]="true">
      <p-fieldset legend="Filters" [toggleable]="true" [transitionOptions]="'200ms'" [collapsed]="true">
        <div class="p-grid">
          <p-card header="Solved?" styleClass="ui-card-shadow">
            <div><p-checkbox name="solvedFilter" value="Unsolved" label="Unsolved" [(ngModel)]="solvedFilter"></p-checkbox></div>
            <p-checkbox name="solvedFilter" value="Solved" label="Solved" [(ngModel)]="solvedFilter"></p-checkbox>
          </p-card>
          <p-card header="Edit Status?" styleClass="ui-card-shadow">
            <div *ngFor="let status of editStatuses">
              <p-checkbox name="statusFilter" [value]="status" [label]="status" [(ngModel)]="statusFilter"></p-checkbox>
            </div>
          </p-card>
        </div>
      </p-fieldset>
      <p-fieldset legend="Statistics" [toggleable]="true" [transitionOptions]="'200ms'" [collapsed]="false">
        <div class="p-grid">
          <p-card header="Solve Rate" styleClass="ui-card-shadow">
            <h3>42%</h3>
          </p-card>
          <p-card header="Time" styleClass="ui-card-shadow">
            <h4>Average Solve Time: ? (not yet implemented)</h4>
          </p-card>
          <p-card header="Difficulty" styleClass="ui-card-shadow">
            <h4>Average Difficulty: ? (not yet implemented)</h4>
            <h4>80th Percentile Difficulty: ? (not yet implemented)</h4>
          </p-card>
          <p-card header="Fun" styleClass="ui-card-shadow">
            <h4>Average Fun Rating: ? (not yet implemented)</h4>
          </p-card>
        </div>
      </p-fieldset>
      <div *ngIf="puzzle; else noPuzzle">
        <div *ngIf="(playtestFeedback$ | async) as playtestFeedback; else noFeedback" class="p-grid">
          <div *ngFor="let report of playtestFeedback">
            <div *ngIf="report.solveMinutes || report.errors || report.visual || report.general">
              <p-card [subheader]="makeSubheader(report, report?.lastChanged?.toDate() | date: 'yyyy-MM-dd HH:mm')" styleClass="ui-card-shadow">
                <p-header>
                  <p-button *ngIf="report.solved; else unsolved" label="Solved" icon="pi pi-check" styleClass="ui-button-success"></p-button>
                  <ng-template #unsolved>
                    <p-button label="Unsolved" icon="pi pi-times" styleClass="ui-button-danger"></p-button>
                  </ng-template>
                  <p-button label="{{ report.userId }}" styleClass="ui-button-secondary"></p-button>
                  <div class="ui-toolbar-group-right">
                    <button pButton type="button" [label]="makeVersion(report)" class="ui-button-info"></button>
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
                  <p-dropdown [options]="editStatuses" [(ngModel)]="report.editStatus" placeholder="Unreviewed">
                    <ng-template let-item pTemplate="selectedItem">
                      <span [ngStyle]="getStyle(item)"> Unreviewed {{ item ? item : "Unreviewed" }} </span>
                    </ng-template>
                    <ng-template let-status pTemplate="item">
                      <span class="ui-helper-clearfix" [ngStyle]="getStyle(status)">
                        {{ status }}
                      </span>
                    </ng-template>
                  </p-dropdown>
                  <p-button label="Add Notes"></p-button>
                  <div class="ui-toolbar-group-right">
                    <app-email-button [subject]="'Question about your feedback on ' + puzzle?.name" [toUser]="report.userId"></app-email-button>
                  </div>
                </p-footer>
              </p-card>
            </div>
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
  styles: [".ui-dropdown { margin-right: 3px; }"],
})
export class ViewPuzzleFeedbackComponent implements OnInit, OnDestroy {
  public puzzle: Puzzle | undefined;
  private spSub: Subscription;

  public playtestFeedback$: Observable<PlaytestFeedbackAugmented[]> | undefined;

  public readonly editStatuses = ["Unreviewed", "Under Consideration", "Asked Author To Fix", "Fixed", "Will Not Fix"];

  public solvedFilter: string[] = ["Unsolved", "Solved"];
  public statusFilter: string[] = [...this.editStatuses];

  constructor(private pts: PlaytestService, public ns: NotifyService, private ps: PuzzleService) {
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
      v = "v" + v;
    }
    return v;
  }

  public makeSubheader(report: PlaytestFeedbackAugmented, d: string) {
    return `
      [${report.solveMinutes} mins]
      [${report.numPlaytesters} solvers]
      D:${"⭐".repeat(report.difficulty)}
      F:${"⭐".repeat(report.fun)}
      ${d}`;
  }

  public fieldSetName(): string {
    return this.puzzle ? "Playtest Feedback for " + this.puzzle.name : "Loading Puzzle...";
  }

  public getStyle(status: string) {
    switch (status) {
      case "":
      case "Unreviewed":
        return { "background-color": "yellow", color: "black" };
      case "Fixed":
        return { "background-color": "darkgreen", color: "white" };
    }
    return {};
  }
}
