import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/services/info.service';
import { Observable } from 'rxjs';
import { Info } from 'src/models/info.model';
import { variables } from 'src/pipes/variables.pipe';

@Component({
  selector: 'app-footer',
  template: `
    <p>
      {{ (footer | async).fulltext | variables }}
    </p>
  `,
  styles: []
})

export class FooterComponent implements OnInit {
  footer: Observable<Info>;
  private infoService: InfoService;

  constructor(infoService: InfoService) {
    this.infoService = infoService;
  }

  ngOnInit() {
    this.footer = this.infoService.getInfo('footer').valueChanges();
  }

}
