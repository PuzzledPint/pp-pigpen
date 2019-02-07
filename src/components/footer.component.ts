import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/services/info.service';
import { Observable } from 'rxjs';
import { Info } from 'src/models/info.model';

@Component({
  selector: 'app-footer',
  template: `
    <p data-cy="app-footer" style="text-align:center; color:#505052">
      {{ (footer | async)?.fulltext | variables }}
    </p>
  `,
  styles: []
})

export class FooterComponent implements OnInit {
  footer: Observable<Info | undefined>;

  constructor(infoService: InfoService) {
    this.footer = infoService.getInfo('footer').valueChanges();
  }

  ngOnInit() {
  }



}
