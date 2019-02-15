import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InfoService, Info } from 'src/services/info.service';
import { Observable } from 'rxjs';
import { FSInfo } from 'src/models/fs-info.model';
import { NotifyService } from 'src/services/notify.service';

@Component({
  selector: 'app-footer',
  template: `
    <p data-cy="app-footer" [ngStyle]="{'text-align':'center','color':'#505052','margin':'0px'}">
      {{ info.footer | variables }}
    </p>
  `,
  styles: []
})

export class FooterComponent implements OnInit {
  info: Info;

  constructor(infoService: InfoService, private ns: NotifyService) {
    this.info = infoService.getInfo();
  }

  ngOnInit() {}
}
