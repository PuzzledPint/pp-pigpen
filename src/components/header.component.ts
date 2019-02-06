import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="p-grid p-justify-between" style="margin:3px">
      <div class="p-col-fixed" style="width:100px">
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
      <div class="p-col">
        <h1
          data-cy="Title"
          style="text-align:center; font-family: 'Indie Flower', cursive;"
        >
          {{ title }}
        </h1>
      </div>
      <div class="p-col-fixed" style="width:150px; text-align:center">
        <app-user-auth></app-user-auth>
      </div>
    </div>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  @Input() title = 'Unbound';

  constructor() {}

  ngOnInit() {}
}
