import { Component } from '@angular/core';

@Component({
  selector: 'view-root',
  template: `
<app-header title='Welcome'></app-header>
<app-footer></app-footer>
`,
  styles: []
})

export class AppComponent {
  title = 'pp-pigpen';
}
