import { Component, OnInit, Input } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import {
  PlaytestFeedback,
  PlaytestService
} from "src/services/playtest.service";
import { IfStmt } from "@angular/compiler";

@Component({
  selector: "app-puzzle-feedback",
  template: `
    <div *ngIf="puzzleRef && puzzleFeedback; else noFeedback" class="p-grid">
      <div class="ui-inputgroup p-col-12 p-lg-3">
        <span class="ui-inputgroup-addon">Number of playtesters</span>
        <input
          pInputText
          type="text"
          [(ngModel)]="puzzleFeedback.numPlaytesters"
          (onblur)="Save()"
        />
      </div>
      <div class="ui-inputgroup p-col-12 p-lg-3">
        <span class="ui-inputgroup-addon">Puzzle Version</span>
        <input
          pInputText
          type="text"
          placeholder="Located near the puzzle title"
          [(ngModel)]="puzzleFeedback.version"
          (onblur)="Save()"
        />
      </div>
    </div>
    <ng-template #noFeedback>
      <p-button label="Add Feedback" (click)="addFeedback()"></p-button>
    </ng-template>
  `,
  styles: []
})
export class PuzzleFeedbackComponent implements OnInit {
  @Input() puzzleRef: DocumentReference | undefined;
  puzzleFeedback: PlaytestFeedback | undefined;

  constructor(private pts: PlaytestService) {}

  async ngOnInit() {
    if (this.puzzleRef) {
      const obs = this.pts.getPlaytestFeedback(this.puzzleRef);
      obs.subscribe(pf => this.puzzleFeedback = pf);
    } else {
      console.error("PuzzleFeedbackComponent: puzzleRef was undefined");
    }
  }

  addFeedback() {
    this.pts.addPlaytestFeedback(this.puzzleRef);
  }
}
