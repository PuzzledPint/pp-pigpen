import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'view-root',
  template: `
    <div class="p-grid" style="background-color:#FAFAFA">
    <div class="p-col-12" [ngStyle]="{'height':'100px', 'background-color':'#FAFAFA','margin-bottom':'0px'}">
    <app-header title="Welcome"></app-header>
      </div>
      <div class="p-col-12">
        <p-scrollPanel [style]="{height:'80vh'}" styleClass="custombar2" >
          <router-outlet></router-outlet>
        </p-scrollPanel>
      </div>
      <div class="p-col-12" [ngStyle]="{'height':'8vh', 'background-color':'#F0F0F0'}">
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: []
})

export class AppComponent {
  title = 'Puzzled Pint';
}
