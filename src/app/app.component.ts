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
  styles: [`
  .custombar2 .ui-scrollpanel-wrapper {
    background-color: #F7F7F7;
    border-radius: 0;
  }

.custombar2 .ui-scrollpanel-content {
  border-radius: 0;
}

.custombar2 .ui-scrollpanel-bar {
  border-radius: 0;
  opacity: 1;
    transition: background-color .3s;
}

.custombar2:hover .ui-scrollpanel-bar {
  background-color: #2222ff;
}
`], encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  title = 'pp-pigpen';
}
