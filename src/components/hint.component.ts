import { Component, OnInit, Input } from "@angular/core";
import { FSHint } from "src/models/fs-hint.model";

@Component({
  selector: "app-hint",
  template: `
    <div class="p-grid">
      <p-button
        class="p-col-4 p-md-2"
        label="{{ revealed ? 'Hide' : 'Reveal' }}"
        (click)="toggleReveal()"
      ></p-button>
      <p class="p-col-8 p-md-4">{{ titleText(hint?.title) }}</p>
      <p class="p-col-12 p-md-6">
        <span [ngStyle]="hintStyle" [innerHTML]="resolveHint()"></span>
      </p>
    </div>
  `,
  styles: []
})
export class HintComponent implements OnInit {
  @Input() public hint: FSHint | undefined;
  public revealed = false;
  public hintStyle = { "background-color": "grey", "color": "grey" };

  constructor() {}

  public ngOnInit() {}

  public toggleReveal() {
    this.revealed = !this.revealed;

    this.hintStyle = this.revealed
      ? { "background-color": "white", "color" : "black" }
      : { "background-color": "grey", "color": "grey" };
  }

  public titleText(title: string): string {
    if (title) {
      return `Hint (${title})`;
    } else {
      return `Hint`;
    }
  }

  public resolveHint(): string {
    return this.revealed ? (this.hint ? this.hint.text : '') : 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOO';
  }
}
