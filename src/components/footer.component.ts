import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InfoService, Info } from 'src/services/info.service';
import { NotifyService } from 'src/services/notify.service';

@Component({
  selector: 'app-footer',
  template: `
  <p data-cy="app-footer" class="footer">
      {{ info.footer | variables }}
    </p>
  `,
  styles: [`.footer{
    text-align:center;
    color:#505052;
    background-color:#F0F0F0;
    margin:1px;
    padding:1rem;
  }`]
})

export class FooterComponent implements OnInit {
  info: Info;

  constructor(infoService: InfoService, private ns: NotifyService) {
    this.info = infoService.getInfo();
  }

  ngOnInit() {}
}
