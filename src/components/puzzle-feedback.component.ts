import { Component, OnInit, Input } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import {
  PlaytestFeedback,
  PlaytestService
} from "src/services/playtest.service";
import { NotifyService } from 'src/services/notify.service';

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
          (blur)="puzzleFeedback.save(ns)"
        />
      </div>
      <div class="ui-inputgroup p-col-12 p-lg-3">
        <span class="ui-inputgroup-addon">Puzzle Version</span>
        <input
          pInputText
          type="text"
          placeholder="Located near the puzzle title"
          [(ngModel)]="puzzleFeedback.version"
          (blur)="puzzleFeedback.save(ns)"
        />
      </div>
    </div>
    <ng-template #noFeedback>
      <h3>Error, feedback object is not defined</h3>
    </ng-template>
  `,
  styles: []
})
export class PuzzleFeedbackComponent implements OnInit {
  @Input() puzzleRef: DocumentReference | undefined;
  puzzleFeedback: PlaytestFeedback | undefined;

  constructor(private pts: PlaytestService, public ns: NotifyService) {
  }

  ngOnInit() {
    if (this.puzzleRef) {
      this.puzzleFeedback = this.pts.getPlaytestFeedback(this.puzzleRef);
    } else {
      console.error("PuzzleFeedbackComponent: puzzleRef was undefined");
    }
  }
}
