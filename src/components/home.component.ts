import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div *ngFor="let i of Arr(50).fill(1)" style="padding: 10px">
  <p-card>
      home works!
    </p-card>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  Arr = Array;
  constructor() { }

  ngOnInit() {
  }

}
