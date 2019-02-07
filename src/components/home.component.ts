import { Component, OnInit } from '@angular/core';
import { NotifyService } from "src/services/notify.service";

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

  constructor(private ns: NotifyService) { }

  ngOnInit() {
    this.ns.setTitle("Welcome");
  }

}
