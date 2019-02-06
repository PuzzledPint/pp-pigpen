import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="p-grid" style="margin:3px">
      <div class="p-col-3">
        <picture>
          <source
            media="(min-width: 900px)"
            srcset="../assets/images/pp-logo-lg.webp"
            type="image/webp"
          />
          <source
            srcset="/assets/images/pp-logo-sm.webp"
            type="image/webp"
          />
          <img src="/assets/images/pp-logo-sm.png" alt="Puzzled Pint Logo" />
        </picture>
      </div>
      <div class="p-col-6">
        <h1 data-cy="Title">{{ title }}</h1>
      </div>
      <div class="p-col-3">
        <app-user-auth></app-user-auth>
      </div>
    </div>
  `,
  styles: [`
@media screen and (min-width: 769px) {
  h1 {
    font-size: 60px;
    text-align:center;
    font-family: 'Indie Flower', cursive;
    margin-top:0;
    margin-bottom:0;
    }
}

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 768px) {
  h1 {
    font-size: 8vw;
    text-align:center;
     font-family: 'Indie Flower', cursive;
      margin-top:0;
       margin-bottom:0;
    }
}
  `]
})

export class HeaderComponent implements OnInit {
  @Input() title = 'Unbound';

  constructor() {}

  ngOnInit() {}
}
