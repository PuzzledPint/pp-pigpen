import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/services/info.service';
import { Observable } from 'rxjs';
import { FSInfo } from 'src/models/fs-info.model';
import { AngularFirestoreDocument } from "@angular/fire/firestore";

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
  footer: AngularFirestoreDocument<FSInfo | undefined>;

  constructor(infoService: InfoService) {
    this.footer = infoService.getInfo('footer');
    this.footer.get
    this.footer.subscribe(f => {
      console.log(f);
    }, error => { }, () => { });
  }

  ngOnInit() {
  }



}
