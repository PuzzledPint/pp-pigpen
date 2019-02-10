import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { PuzzleService } from "src/services/puzzle.service";

@Component({
  selector: "app-edit-puzzle-set",
  template: `
    <p-toast [style]="{ marginTop: '80px' }"></p-toast>
    <p-fieldset
      legend="Add Puzzle Set"
      [toggleable]="true"
      [transitionOptions]="'100ms'"
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
      <p-message
        severity="error"
        text="Please enter a valid slug"
        *ngIf="!form.controls['slug'].valid && form.controls['slug'].dirty"
      >
      </p-message>
    </div>
  </form>
    </p-fieldset>
  `,
  styles: []
})
export class EditPuzzleSetComponent implements OnInit {
  form: FormGroup;
  slug = new FormControl("");

  constructor(private ps: PuzzleService, fb: FormBuilder) {
    this.form = fb.group({
      slug: [
        "",
        Validators.compose([Validators.required, Validators.pattern("[a-z]+")])
      ]
    });
  }

  ngOnInit() { }

  onSubmit(f: any) {
  }

}
