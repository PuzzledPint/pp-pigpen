import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <h1 data-cy='Title'>
    {{ title }}
  </h1>
  `,
  styles: []
})

export class HeaderComponent implements OnInit {
  @Input() title = 'Unbound';

  constructor() { }

  ngOnInit() {
  }

}
