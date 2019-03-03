import { Component, OnInit } from "@angular/core";
import { PuzzleService, PuzzleSet, Puzzle } from "src/services/puzzle.service";
import { NotifyService } from "src/services/notify.service";
import { Observable } from "rxjs";
import { DocumentReference } from "@angular/fire/firestore";
import { SelectItem } from "primeng/api";

@Component({
  selector: "app-edit-puzzle-set",
  template: `
    <div *ngIf="selectedPuzzleSet">
      <form (ngSubmit)="savePuzzleSet()" #puzzleSetForm="ngForm">
        <p-fieldset
          legend="Edit Puzzle Set"
          [toggleable]="true"
          [transitionOptions]="'200ms'"
          [collapsed]="false"
        >
          <div class="p-grid">
            <div class="ui-inputgroup p-col-12 p-lg-3">
              <span class="ui-inputgroup-addon">Name</span>
              <input
                pInputText
                type="text"
                placeholder=" Full title of the puzzle set"
                [(ngModel)]="selectedPuzzleSet.name"
                name="name"
                required
                #name="ngModel"
              />
              <p-message
                severity="error"
                text="{{ errorText(name) }}"
                *ngIf="!name.valid && name.dirty"
              >
              </p-message>
            </div>
            <div class="ui-inputgroup p-col-12 p-lg-3">
              <span class="ui-inputgroup-addon">Slug</span>
              <input
                pInputText
                type="text"
                placeholder=" must be only a-z"
                required
                pattern="[a-z]+"
                [(ngModel)]="selectedPuzzleSet.slug"
                name="slug"
                #slug="ngModel"
              />
              <p-message
                *ngIf="!slug.valid && slug.dirty"
                severity="error"
                text="{{ errorText(slug) }}"
              >
              </p-message>
            </div>
            <div class="ui-inputgroup p-col-12 p-lg-6">
              <span class="ui-inputgroup-addon">Polaroid URL</span>
              <input
                pInputText
                type="text"
                placeholder="/assets/foo.png"
                [(ngModel)]="selectedPuzzleSet.polaroid"
                name="polaroid"
                size="30"
                #polaroid="ngModel"
              />
            </div>
            <div class="ui-inputgroup p-col-12 p-lg-6">
              <span class="ui-inputgroup-addon">Month</span>
              <p-calendar
                [(ngModel)]="selectedPuzzleSet.month"
                name="month"
                view="month"
                dateFormat="yy-mm"
                [inline]="true"
                [yearNavigator]="true"
                dataType="string"
                yearRange="2008:2035"
              >
              </p-calendar>
            </div>
            <p-orderList
              [value]="selectedPuzzleSet.puzzleRefs"
              class="class p-col-12 p-lg-6"
              [(selection)]="selectedPuzzles"
              (onSelectionChange)="puzzleSelectionChanged()"
            >
              >
              <ng-template let-puzzleRef pTemplate="item">
                <p>
                  {{ (puzzleRef | refToPuzzle | async)?.name }} ({{
                    (puzzleRef | refToPuzzle | async)?.type
                  }})
                </p>
              </ng-template>
            </p-orderList>
            <div class="ui-inputgroup p-col-12 p-lg-3">
              <span class="ui-inputgroup-addon">In Playtesting</span>
              <p-inputSwitch
                [(ngModel)]="selectedPuzzleSet.playtesting"
                name="playtesting"
                pInputText
              ></p-inputSwitch>
            </div>
            <div class="ui-inputgroup p-col-12 p-lg-3">
              <span class="ui-inputgroup-addon">On the Home Page</span>
              <p-inputSwitch
                [(ngModel)]="selectedPuzzleSet.onhomepage"
                name="onhomepage"
                pInputText
              ></p-inputSwitch>
            </div>
            <div class="ui-inputgroup p-col-12 p-lg-2">
              <span class="ui-inputgroup-addon">In Archives</span>
              <p-inputSwitch
                [(ngModel)]="selectedPuzzleSet.archives"
                name="archives"
                pInputText
              ></p-inputSwitch>
            </div>
            <p-toolbar class="p-col-12 p-lg-4">
              <div class="ui-toolbar-group-right">
                <p-button
                  label="Add Puzzle"
                  type="button"
                  (click)="addPuzzle()"
                  [ngStyle]="{ 'margin-right': '1rem' }"
                ></p-button>
                <p-button
                  type="submit"
                  label="Save Puzzle Set"
                  [disabled]="!puzzleSetForm.valid"
                ></p-button>
              </div>
            </p-toolbar>
          </div>
        </p-fieldset>
      </form>
    </div>
    <br />
    <div *ngIf="selectedPuzzle as puzzle">
      <form (ngSubmit)="savePuzzle()" #puzzleForm="ngForm">
        <p-fieldset
          legend="Edit Puzzle"
          [toggleable]="true"
          [transitionOptions]="'200ms'"
          [collapsed]="false"
        >
          <div class="p-grid">
            <div class="ui-inputgroup p-col-12 p-lg-3">
              <span class="ui-inputgroup-addon">Name</span>
              <input
                pInputText
                type="text"
                placeholder=" Full title of the puzzle"
                [(ngModel)]="puzzle.name"
                name="name"
                required
                #name="ngModel"
              />
              <p-message
                severity="error"
                text="{{ errorText(name) }}"
                *ngIf="!name.valid && name.dirty"
              >
              </p-message>
            </div>
            <div class="ui-inputgroup p-col-12 p-lg-2">
              <span class="ui-inputgroup-addon">Type</span>
              <p-dropdown
                [options]="puzzleTypes"
                [(ngModel)]="puzzle.type"
                name="type"
                #type="ngModel"
                placeholder="Select..."
                [showClear]="false"
              >
              </p-dropdown>
              <p-message
                *ngIf="!type.valid && type.dirty"
                severity="error"
                text="{{ errorText(type) }}"
              >
              </p-message>
            </div>
            <div class="ui-inputgroup p-col-12 p-lg-7">
              <span class="ui-inputgroup-addon">PDF URL</span>
              <input
                pInputText
                type="text"
                placeholder="Google Drive Link"
                [(ngModel)]="puzzle.pdf"
                name="pdf"
                size="60"
                #polaroid="ngModel"
              />
            </div>
            <p-table [value]="puzzle.hints" (onEditComplete)="savePuzzle()">
              <ng-template pTemplate="caption">
                <p>Hints</p>
              </ng-template>
              <ng-template pTemplate="header">
                <tr>
                  <th style="width:3rem"></th>
                  <th style="width:20%">Title</th>
                  <th>Full Hint Text</th>
                </tr>
              </ng-template>
              <ng-template pTemplate="body" let-hint let-index="rowIndex">
                <tr [pReorderableRow]="index">
                  <td pReorderableRowHandle>
                    <i pReorderableRowHandle class="pi pi-bars"></i>
                  </td>
                  <td pEditableColumn>
                    <p-cellEditor>
                      <ng-template pTemplate="input">
                        <input
                          type="text"
                          [(ngModel)]="hint.title"
                          [ngModelOptions]="{ standalone: true }"
                        />
                      </ng-template>
                      <ng-template pTemplate="output">
                        {{ hint.title }}
                      </ng-template>
                    </p-cellEditor>
                  </td>
                  <td pEditableColumn>
                    <p-cellEditor>
                      <ng-template pTemplate="input">
                        <textarea
                          [rows]="3"
                          [(ngModel)]="hint.text"
                          [ngModelOptions]="{ standalone: true }"
                        ></textarea>
                      </ng-template>
                      <ng-template pTemplate="output">
                        {{ hint.text }}
                      </ng-template>
                    </p-cellEditor>
                  </td>
                </tr>
              </ng-template>
            </p-table>
            <p-toolbar class="p-col-12 p-lg-12">
              <div class="ui-toolbar-group-right">
                <p-button
                  type="button"
                  label="Add Hint"
                  (click)="addHint()"
                  [ngStyle]="{ 'margin-right': '1rem' }"
                ></p-button>
                <p-button
                  type="submit"
                  label="Save Puzzle"
                  [disabled]="!puzzleForm.valid"
                ></p-button>
              </div>
            </p-toolbar>
          </div>
        </p-fieldset>
      </form>
    </div>
  `,
  styles: []
})
export class EditPuzzleSetComponent implements OnInit {
  public selectedPuzzleSet: PuzzleSet | undefined;
  public selectedPuzzles: DocumentReference[] = [];
  public selectedPuzzle: Puzzle | undefined = undefined;
  public puzzleTypes: SelectItem[] = [
    { label: "Location", value: "Location" },
    { label: "Main Set", value: "Main Set" },
    { label: "Meta", value: "Meta" },
    { label: "Bonus", value: "Bonus" }
  ];

  constructor(public ps: PuzzleService, private ns: NotifyService) {
    ps.selectedPuzzleSet.subscribe(newSPS => {
      if (newSPS) {
        newSPS.subscribe(newPS => {
          this.selectedPuzzleSet = newPS;
        });
      }
    });
  }

  public addHint() {
    if (this.selectedPuzzle) {
      this.selectedPuzzle.hints.push({ title: "", text: "" });
      this.savePuzzle();
    }
  }

  public async addPuzzle() {
    const ps = this.selectedPuzzleSet;
    if (!ps) {
      return;
    }
    const newPuzzleRef = await this.ps.addPuzzle();
    if (!ps.puzzleRefs) {
      ps.puzzleRefs = [];
    }
    ps.puzzleRefs.push(newPuzzleRef);
    this.savePuzzleSet();
  }

  public savePuzzleSet() {
    if (this.selectedPuzzleSet) {
      if (this.ps.isSetSlugUnique(this.selectedPuzzleSet.slug)) {
        this.ps.updatePuzzleSet(this.selectedPuzzleSet);
      } else {
        this.ns.error("Slug in use", "slugs must be unique");
      }
    } else {
      console.error("Save Puzzle Set called with no selected set");
    }
  }

  public savePuzzle() {
    if (this.selectedPuzzle) {
      this.ps.updatePuzzle(this.selectedPuzzle);
    } else {
      console.error("Save Puzzle Set called with no selected set");
    }
  }

  public ngOnInit() {}

  public errorText(field: any): string {
    if (!field) {
      return "";
    }
    const errors = field.errors;
    if (errors["required"]) {
      return "You must provide a value";
    }
    if (errors["pattern"]) {
      return "A slug must only use the letters a-z, be all in lower case, and have no spaces";
    }
    if (errors["notUnique"]) {
      return "Already in use.";
    }
    console.log(errors);
    return "Unknown validation error";
  }

  public puzzleSelectionChanged() {
    if (this.selectedPuzzles && this.selectedPuzzles[0]) {
      this.ps
        .getPuzzle(this.selectedPuzzles[0])
        .subscribe(newPuzzle => (this.selectedPuzzle = newPuzzle));
    } else {
      this.selectedPuzzle = undefined;
    }
  }
}
