import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { PlaytestFeedback, PlaytestService } from "src/services/playtest.service";
import { NotifyService } from "src/services/notify.service";

@Component({
  selector: "app-playtesting-puzzle-feedback",
  template: `
    <p-fieldset legend="Your Feedback" [toggleable]="true" [transitionOptions]="'200ms'" [collapsed]="true">
      <div *ngIf="puzzleRef && puzzleFeedback; else noFeedback" class="p-grid">
        <div class="ui-inputgroup p-col-12 p-md-6 p-lg-6 p-xl-4">
          <span class="ui-inputgroup-addon">Puzzle Version</span>
          <input pInputText type="text" size="5" [(ngModel)]="puzzleFeedback!.version" (blur)="save()" />
        </div>
        <div class="ui-inputgroup p-col-12 p-md-6 p-lg-6 p-xl-4">
          <span class="ui-inputgroup-addon">Number of playtesters</span>
          <input pInputText type="text" size="5" [(ngModel)]="puzzleFeedback!.numPlaytesters" (blur)="save()" />
        </div>
        <div class="ui-inputgroup p-col-12 p-md-6 p-lg-6 p-xl-4">
          <span class="ui-inputgroup-addon">How long did you work on this puzzle?</span>
          <input pInputText type="text" placeholder="(in minutes)" size="10" [(ngModel)]="puzzleFeedback!.solveMinutes" (blur)="save()" />
        </div>
        <div class="ui-inputgroup p-col-12 p-md-6 p-lg-6 p-xl-4">
          <p-checkbox class="ui-inputgroup-addon" label="Did you solve this puzzle without hints?" binary="true" [(ngModel)]="puzzleFeedback!.solved" (click)="save()"></p-checkbox>
        </div>
        <div class="ui-inputgroup p-col-12 p-md-6 p-lg-6 p-xl-4">
          <span class="ui-inputgroup-addon">How difficult was this puzzle?</span>
          <p-rating class="ui-inputgroup-addon" [(ngModel)]="puzzleFeedback!.difficulty" [cancel]="false" (click)="save()"></p-rating>
        </div>
        <div class="ui-inputgroup p-col-12 p-md-6 p-lg-6 p-xl-4">
          <span class="ui-inputgroup-addon">How fun was this puzzle?</span>
          <p-rating class="ui-inputgroup-addon" [(ngModel)]="puzzleFeedback!.fun" [cancel]="false" (click)="save()"></p-rating>
        </div>
        <h3 class="p-col-12">
          Did the puzzle contain any design, logic, or typogrpahical errors?
        </h3>
        <div class="p-col-12">
          <textarea [rows]="3" style="width:100%" pInputTextarea autoResize="autoResize" [(ngModel)]="puzzleFeedback!.errors" (blur)="save()"></textarea>
        </div>
        <h3 class="p-col-12">
          Did you experience any visual, layout, or printing errors?
        </h3>
        <div class="p-col-12">
          <textarea [rows]="3" style="width:100%" pInputTextarea autoResize="autoResize" [(ngModel)]="puzzleFeedback!.visual" (blur)="save()"></textarea>
        </div>
        <h3 class="p-col-12">
          Please provide general feedback on your solving experience.
        </h3>
        <div class="p-col-12">
          <textarea [rows]="3" pInputTextarea autoResize="autoResize" [(ngModel)]="puzzleFeedback!.general" (blur)="save()"></textarea>
        </div>
        <p-toolbar class="p-col-12 p-lg-12">
          <div class="ui-toolbar-group-right">
            <p-button label="Save Feedback" icon="pi pi-save" iconPos="right" (click)="saveNext()"></p-button>
          </div>
        </p-toolbar>
      </div>
      <ng-template #noFeedback>
        <h3>Error, feedback object is not defined</h3>
      </ng-template>
    </p-fieldset>
  `,
  styles: ["h3 { margin:0px }", "textarea { width:100%}"],
})
export class PuzzleFeedbackComponent implements OnInit {
  @Input() public puzzleRef: DocumentReference | undefined;
  @Output() public saved = new EventEmitter();

  public puzzleFeedback: PlaytestFeedback | undefined;
  constructor(private pts: PlaytestService, public ns: NotifyService) {}

  public save() {
    if (this.puzzleFeedback) {
      this.puzzleFeedback.save(this.ns);
    }
  }

  public saveNext() {
    this.save();
    this.saved.emit();
  }

  public ngOnInit() {
    if (this.puzzleRef) {
      this.puzzleFeedback = this.pts.getPlaytestFeedback(this.puzzleRef);
    } else {
      console.error("PuzzleFeedbackComponent: puzzleRef was undefined");
    }
  }
}
