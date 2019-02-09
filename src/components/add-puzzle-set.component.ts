import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { PuzzleService } from "src/services/puzzle.service";

@Component({
  selector: "app-add-puzzle-set",
  template: `
    <p-toast [style]="{marginTop: '80px'}"></p-toast>
    <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
            Slug:
            <input pInputText type="text" formControlName="slug" placeholder=" must be unique"/>
        <p-button type="submit" label="Add Puzzle Set" [disabled]="!form.valid"></p-button>
            <p-message
            severity="error"
            text="Please enter a valid slug"
            *ngIf="!form.controls['slug'].valid && form.controls['slug'].dirty">
            </p-message>
    </form>
  `,
  styles: []
})
export class AddPuzzleSetComponent implements OnInit {
  form: FormGroup;
  slug = new FormControl("");

  constructor(private ps: PuzzleService, fb: FormBuilder) {
    this.form = fb.group({
      slug: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-z]+")
        ])
      ]
    });
  }

  ngOnInit() {}
}
