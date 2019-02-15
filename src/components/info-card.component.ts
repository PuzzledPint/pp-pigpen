import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-info-card",
  template: `
  <div style="padding:5px;margin-bottom:0px">
    <p-card
      header="{{ title }}"
      subheader="{{ subtitle }}"
      styleClass="ui-card-shadow"
    >
      <p-header *ngIf="imageUrl">
        <img src="{{ imageUrl }}" />
      </p-header>
      <span>{{ text }}</span>
      <p-footer *ngIf="buttonText">
        <button
          pButton
          type="button"
          label="{{ buttonText }}"
          class="ui-button-primary"
          style="float:right"
          (click)="go()"
        ></button>
      </p-footer>
    </p-card>
    </div>
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

  ngOnInit() {
  }

  async go() {
    const result = await this.r.navigate([ this.link ? this.link : "" ]);
  }
}
