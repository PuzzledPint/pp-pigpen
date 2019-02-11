import { Component, OnInit, Input } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  AsyncValidatorFn,
  AbstractControl
} from "@angular/forms";
import { PuzzleService, PuzzleSet } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-edit-puzzle-set",
  template: `
    {{ (selectedPuzzleSet | async)?.name }}
    <p-fieldset
      legend="Edit Puzzle Set"
      [toggleable]="true"
      [transitionOptions]="'200ms'"
      [collapsed]="false"
    >
      <form [formGroup]="form">
        <div class="ui-inputgroup">
          <input
            pInputText
            type="text"
            formControlName="name"
            (change)="save()"
            placeholder=" Name"
          />
          <p-message
            severity="error"
            text="{{ errorText(name.errors) }}"
            *ngIf="!form.controls['name'].valid && form.controls['name'].dirty"
          >
          </p-message>

          <input
            pInputText
            type="text"
            formControlName="slug"
            (change)="save()"
            placeholder=" Slug (must be unique)"
          />
          <p-message
            severity="error"
            text="{{ errorText(slug.errors) }}"
            *ngIf="!form.controls['slug'].valid && form.controls['slug'].dirty"
          >
          </p-message>

          <p-inputSwitch
          formControlName="playtesting"
          (onChange)="save()"
          ></p-inputSwitch>
          </div>
      </form>
    </p-fieldset>
  `,
  styles: []
})
export class EditPuzzleSetComponent implements OnInit {
  form: FormGroup;
  selectedPuzzleSet: Observable<PuzzleSet> | undefined = undefined;

  constructor(private ps: PuzzleService, fb: FormBuilder) {
    ps.selectedPuzzleSet.subscribe(newSPS => {
      this.selectedPuzzleSet = newSPS;
      if (this.selectedPuzzleSet) {
        this.selectedPuzzleSet.subscribe(puzzleSet => this.form.patchValue(puzzleSet));
      }
    });

    this.form = fb.group({
      slug: ["",
        Validators.compose([Validators.required, Validators.pattern("[a-z]+")]),
        this.notUnique()
      ],
      name: ["", Validators.compose([Validators.required])],
      playtesting: ["", null]
    });
  }

  save() {
    this.form.va
  }
  get slug() {
    return this.form.get("slug");
  }

  ngOnInit() {}

  errorText(errors: any): string {
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

  // notUnique(): AsyncValidatorFn {
  //   return (control: AbstractControl) => {
  //     return this.uniqueErrors(control.value);
  //   };
  // }

  // async uniqueErrors(slug: string): Promise<{ [key: string]: any } | null> {
  //   if (await this.ps.isSetSlugUnique(slug)) {
  //     return null;
  //   } else {
  //     return { notUnique: true };
  //   }
  // }

  notUnique(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      if (await this.ps.isSetSlugUnique(control.value)) {
        return null;
      } else {
        return { notUnique: true };
      }
    };
  }
}
