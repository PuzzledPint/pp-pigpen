import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <h1 data-cy='Title' style="font-family:dakota">
    {{ title }}
  </h1>
  `,
  styles: [`@font-face { font-family: 'Dakota'; src: url('/assets/fonts/dakota-regular.ttf'); }`]
})

export class HeaderComponent implements OnInit {
  @Input() title = 'Unbound';

  constructor() { }

  ngOnInit() {
  }

}
