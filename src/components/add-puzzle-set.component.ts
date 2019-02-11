import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
  Validator,
  ValidatorFn
} from "@angular/forms";
import { PuzzleService } from "src/services/puzzle.service";

@Component({
  selector: "app-add-puzzle-set",
  template: `
    <p-fieldset
      legend="Add Puzzle Set"
      [toggleable]="true"
      [transitionOptions]="'200ms'"
      [collapsed]="false"
    >
      <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
      <div class="ui-inputgroup">
      <input
        pInputText
        type="text"
        formControlName="slug"
        placeholder=" Slug (must be unique)"
      />
      <p-button
        type="submit"
        label="Create"
        [disabled]="!form.valid"
      ></p-button>
      </div>
      <p-message
        severity="error"
        text="{{ errorText(slug.errors) }}"
        *ngIf="!form.controls['slug'].valid && form.controls['slug'].dirty"
      >
      </p-message>
  </form>
    </p-fieldset>
  `,
  styles: []
})
export class AddPuzzleSetComponent implements OnInit {
  form: FormGroup;

  constructor(private ps: PuzzleService, fb: FormBuilder) {
    this.form = fb.group({
      slug: [
        "",
        Validators.compose([Validators.required, Validators.pattern("[a-z]+"), this.notUnique()])
      ]
    });
  }

  get slug() { return this.form.get('slug'); }

  ngOnInit() { }

  onSubmit(f: any) {
    this.ps.addPuzzleSet(f.slug);
  }

  errorText(errors: any): string {
    if (errors["required"]) { return "You must provide a value"; }
    if (errors["pattern"]) { return "A slug must only use the letters a-z, be all in lower case, and have no spaces"; }
    if (errors["notUnique"]) { return "slug already in use."; }
    console.log(errors);
    return "Unknown validation error";
  }

  notUnique(): ValidatorFn {
    return control => {
      if (this.ps.puzzleSets.has(control.value)) {
        return { notUnique: true };
      }
      return null;
    };
  }
}
