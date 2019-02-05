import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <div class="p-grid p-justify-between" style='margin:3px'>
  <div class="p-col-fixed" style="width:100px"><img src="../assets/images/PuzzledPintLogo.png" width="150"></div>
  <div class="p-col">
  <h1 data-cy='Title' style="text-align:center; font-family:dakota">
  {{ title }}
  </h1>
</div>
  <div class="p-col-fixed" style="width:100px; text-align:center">Not Signed In</div>
  </div>
  `,
  styles: [`@font-face { font-family: 'Dakota'; src: url('/assets/fonts/dakota-regular.ttf') format('truetype'); }`]
})

export class HeaderComponent implements OnInit {
  @Input() title = 'Unbound';

  constructor() { }

  ngOnInit() {
  }

}
