import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <p>
      © {{ year }} CC BY-NC-SA Intl. by Puzzled Pint (Portland, OR, USA)
    </p>
  `,
  styles: []
})
export class FooterComponent implements OnInit {
  readonly year = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
