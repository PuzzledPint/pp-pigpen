import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <p-card>
      home works!
    </p-card>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
