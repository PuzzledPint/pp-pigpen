import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/services/info.service';
import { Observable } from 'rxjs';
import { Info } from 'src/models/info.model';

@Component({
  selector: 'app-footer',
  template: `
    <p>
      © {{ year }} {{ (footer | async).fulltext }}
    </p>
  `,
  styles: []
})

export class FooterComponent implements OnInit {
  readonly year = new Date().getFullYear();
  footer: Observable<Info>;
  private infoService: InfoService;

  constructor(infoService: InfoService) {
    this.infoService = infoService;
  }

  ngOnInit() {
    this.footer = this.infoService.getInfo('footer').valueChanges();
  }

}
