import { Component, OnInit, Input } from "@angular/core";
import { FSHint } from "src/models/fs-hint.model";

@Component({
  selector: "app-hint",
  template: `
    <div class="p-grid">
      <p-button
        class="p-col-1"
        label="{{ revealed ? 'Hide' : 'Reveal' }}"
        (click)="toggleReveal()"
      ></p-button>
      <p class="p-col-3">{{ titleText(hint?.title) }}</p>
      <p class="p-col-8">
        <span [ngStyle]="hintStyle">{{ hint?.text }}</span>
      </p>
    </div>
  `,
  styles: []
})
export class HintComponent implements OnInit {
  @Input() hint: FSHint | undefined;
  revealed = false;
  hintNum = 0;
  hintStyle = { "background-color": "grey", "color": "grey" };

  constructor() {}

  ngOnInit() {}

  toggleReveal() {
    this.revealed = !this.revealed;

    this.hintStyle = this.revealed
      ? { "background-color": "white", "color" : "black" }
      : { "background-color": "grey", "color": "grey" };
  }

  titleText(title: string): string {
    if (title) {
      return `Hint (${title})`;
    } else {
      this.hintNum++;
      return `Hint (${this.hintNum})`;
    }
  }
}
