import { Component, OnInit } from "@angular/core";
import { PuzzleService, PuzzleSet } from "src/services/puzzle.service";
import { NotifyService } from "src/services/notify.service";

@Component({
  selector: "app-edit-puzzle-set",
  template: `
    <div *ngIf="selectedPuzzleSet">
      <form (ngSubmit)="save()" #puzzleSetForm="ngForm">
        <p-fieldset
          legend="Edit Puzzle Set"
          [toggleable]="true"
          [transitionOptions]="'200ms'"
          [collapsed]="false"
        >
          <div class="p-grid">
            <div class="ui-inputgroup p-col-12">
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
                >
              </p-message>
            </div>
            <div class="ui-inputgroup p-col-12">
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
            <div class="p-col-4">
              <span>In Playtesting</span>
            </div>
            <p-inputSwitch
              class="p-col-2"
              [(ngModel)]="selectedPuzzleSet.playtesting"
              name="playtesting"
            ></p-inputSwitch>
            <p-toolbar class="p-col-12">
              <div class="ui-toolbar-group-right">
                <p-button
                  type="submit"
                  label="Save"
                  [disabled]="!puzzleSetForm.valid"
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
  selectedPuzzleSet: PuzzleSet | undefined;

  constructor(private ps: PuzzleService, private ns: NotifyService) {
    ps.selectedPuzzleSet.subscribe(newSPS => {
      if (newSPS) {
        newSPS.subscribe(newPS => {
          this.selectedPuzzleSet = newPS;
        });
      }
    });
  }

  save() {
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

  ngOnInit() {}

  errorText(field: any): string {
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
}
