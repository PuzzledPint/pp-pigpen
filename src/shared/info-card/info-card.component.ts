import { Component, OnInit, Input, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: "app-info-card",
  template: `
    <div (click)="click()">
      <p-card
        header="{{ title }}"
        subheader="{{ subtitle }}"
        styleClass="ui-card-shadow"
      >
        <p-header *ngIf="imageUrl">
          <img src="{{ imageUrl }}" />
        </p-header>
        <span>{{ text }}</span>
      </p-card>
    </div>
  `,
  styles: ["div { padding:5px;margin-bottom:0px; cursor: pointer }"]
})
export class InfoCardComponent implements OnInit {
  @Input() public title: string | undefined;
  @Input() public subtitle: string | undefined;
  @Input() public imageUrl: string | undefined;
  @Input() public text: string | undefined;
  @Input() public link: string | undefined;

  constructor(private r: Router, @Inject(DOCUMENT) private document: any) { }

  public ngOnInit() { }

  public click() {
    if (!this.link) return;
    if (this.link.startsWith("http") || this.link.startsWith("www")) {
      document.location.href = this.link;
    } else {
      // router link
      this.r.navigate([this.link]);
    }
  }
}
