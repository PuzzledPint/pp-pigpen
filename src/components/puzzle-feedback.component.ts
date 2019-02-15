import { Component, OnInit, Input } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import {
  PlaytestFeedback,
  PlaytestService
} from "src/services/playtest.service";
import { NotifyService } from "src/services/notify.service";

@Component({
  selector: "app-puzzle-feedback",
  template: `
    <p-fieldset
      legend="Your Feedback"
      [toggleable]="true"
      [transitionOptions]="'200ms'"
      [collapsed]="false"
    >
      <div *ngIf="puzzleRef && puzzleFeedback; else noFeedback" class="p-grid">
        <div class="ui-inputgroup p-col-12 p-lg-4">
          <span class="ui-inputgroup-addon">Number of playtesters</span>
          <input
            pInputText
            type="text"
            [(ngModel)]="puzzleFeedback.numPlaytesters"
            (blur)="puzzleFeedback.save(ns)"
          />
        </div>
        <div class="ui-inputgroup p-col-12 p-lg-4">
          <span class="ui-inputgroup-addon">Puzzle Version</span>
          <input
            pInputText
            type="text"
            placeholder="Located near the puzzle title"
            [(ngModel)]="puzzleFeedback.version"
            (blur)="puzzleFeedback.save(ns)"
          />
        </div>
        <div class="ui-inputgroup p-col-12 p-lg-4">
          <span class="ui-inputgroup-addon"
            >How long did it take you to solve this puzzle? (in minutes)</span
          >
          <input
            pInputText
            type="text"
            [(ngModel)]="puzzleFeedback.solveMinutes"
            (blur)="puzzleFeedback.save(ns)"
          />
        </div>
        <div class="ui-inputgroup p-col-12 p-lg-4">
          <p-checkbox
            class="ui-inputgroup-addon"
            label="Did you solve this puzzle without hints?"
            binary="true"
            [(ngModel)]="puzzleFeedback.solved"
            (click)="puzzleFeedback.save(ns)"
          ></p-checkbox>
        </div>
        <div class="ui-inputgroup p-col-12 p-lg-4">
          <span class="ui-inputgroup-addon"
            >How difficult was this puzzle?</span
          >
          <p-rating
            class="ui-inputgroup-addon"
            [(ngModel)]="puzzleFeedback.difficulty"
            [cancel]="false"
            (click)="puzzleFeedback.save(ns)"
          ></p-rating>
        </div>
        <div class="ui-inputgroup p-col-12 p-lg-4">
          <span class="ui-inputgroup-addon">How fun was this puzzle?</span>
          <p-rating
            class="ui-inputgroup-addon"
            [(ngModel)]="puzzleFeedback.fun"
            [cancel]="false"
            (click)="puzzleFeedback.save(ns)"
          ></p-rating>
        </div>
        <h3 class="p-col-12">
          Did the puzzle contain any design, logic, or typogrpahical errors?
        </h3>
        <div class="p-col-12">
          <p-editor
            (keyup.enter)="puzzleFeedback.save(ns)"
            [(ngModel)]="puzzleFeedback.errors"
            [style]="{ height: '10rem' }"
          ></p-editor>
        </div>
        <h3 class="p-col-12">
          Did you experience any visual, layout, or printing errors?
        </h3>
        <div class="p-col-12">
          <p-editor
            (keyup.enter)="puzzleFeedback.save(ns)"
            [(ngModel)]="puzzleFeedback.visual"
            [style]="{ height: '10rem' }"
          ></p-editor>
        </div>
        <h3 class="p-col-12">
          Please provide general feedback on your solving experience.
        </h3>
        <div class="p-col-12">
          <p-editor
            (keyup.enter)="puzzleFeedback.save(ns)"
            [(ngModel)]="puzzleFeedback.general"
            [style]="{ height: '10rem' }"
          ></p-editor>
        </div>
        <p-toolbar class="p-col-12 p-lg-12">
          <div class="ui-toolbar-group-right">
            <p-button
              label="Save Feedback"
              (click)="puzzleFeedback.save(ns)"
            ></p-button>
          </div>
        </p-toolbar>
      </div>
      <ng-template #noFeedback>
        <h3>Error, feedback object is not defined</h3>
      </ng-template>
    </p-fieldset>
  `,
  styles: []
})
export class PuzzleFeedbackComponent implements OnInit {
  @Input() puzzleRef: DocumentReference | undefined;
  puzzleFeedback: PlaytestFeedback | undefined;

  constructor(private pts: PlaytestService, public ns: NotifyService) {}

  ngOnInit() {
    if (this.puzzleRef) {
      this.puzzleFeedback = this.pts.getPlaytestFeedback(this.puzzleRef);
    } else {
      console.error("PuzzleFeedbackComponent: puzzleRef was undefined");
    }
  }
}
