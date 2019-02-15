import { Component, OnInit, Input } from "@angular/core";
import { AppRoutingModule } from "src/app/app-routing.module";
import { Router } from "@angular/router";

@Component({
  selector: "app-info-card",
  template: `
    <p-card
      header="{{ title }}"
      subheader="{{ subtitle }}"
      styleClass="ui-card-shadow"
    >
      <p-header *ngIf="imageUrl">
        <img src="{{ imageUrl }}" />
      </p-header>
      <div>{{ text }}</div>
      <p-footer *ngIf="buttonText" class="ui-toolbar-group-right">
        <button
          pButton
          type="button"
          label="{{ buttonText }}"
          class="ui-button-primary"
          (click)="go()"
        ></button>
      </p-footer>
    </p-card>
  `,
  styles: []
})
export class InfoCardComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() imageUrl: string | undefined;
  @Input() text: string | undefined;
  @Input() buttonText: string | undefined;
  @Input() link: string | undefined;

  constructor(private r: Router) {}

  ngOnInit() {}

  go() {
    this.r.navigate([this.link]);
  }
}
