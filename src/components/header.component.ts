import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NotifyService } from "src/services/notify.service";
import { BehaviorSubject } from "rxjs";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

@Component({
  selector: "app-header",
  template: `
    <div class="p-grid" style="padding:0px">
      <div class="p-col-3">
        <picture>
          <source
            media="(min-width: 900px)"
            srcset="../assets/images/pp-logo-lg.webp"
            type="image/webp"
          />
          <source srcset="/assets/images/pp-logo-sm.webp" type="image/webp" />
          <img src="/assets/images/pp-logo-sm.png" alt="Puzzled Pint Logo" />
        </picture>
      </div>
      <div class="p-col-6">
        <p-toast></p-toast>
        <div [@titleBounce]="1">
          <h1 data-cy="Title" style="margin:0px">{{ title | async }}</h1>
        </div>
      </div>
      <div class="p-col-3">
        <app-user-auth></app-user-auth>
      </div>
    </div>
  `,
  styles: [
    `
      @media screen and (min-width: 769px) {
        h1 {
          font-size: 60px;
          text-align: center;
          font-family: "Indie Flower", cursive;
          margin-top: 0;
          margin-bottom: 0;
        }
      }

      /* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
      @media screen and (max-width: 768px) {
        h1 {
          font-size: 8vw;
          text-align: center;
          font-family: "Indie Flower", cursive;
          margin-top: 0;
          margin-bottom: 0;
        }
      }
    `
  ],
  animations: [
    trigger("titleBounce", [
      state("1", style({ transform: "translateY(0px)" })),
      transition("* => 1", [
        animate("0ms ease-in", style({ transform: "translateY(-300px)" })),
        animate("500ms ease-in", style({ transform: "translateY(0px)" })),
        animate("200ms ease-out", style({ transform: "translateY(-50px)" })),
        animate("200ms ease-in", style({ transform: "translateY(0px)" })),
        animate("200ms ease-out", style({ transform: "translateY(-20px)" })),
        animate("200ms ease-out")
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public title: BehaviorSubject<string>;

  constructor(private ns: NotifyService) {
    this.title = ns.title;
  }

  ngOnInit() {
  }

}
