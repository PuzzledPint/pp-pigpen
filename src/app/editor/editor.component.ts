import { Component, OnInit } from '@angular/core';
import { NotifyService } from "src/services/notify.service";

@Component({
  selector: 'view-editor',
  template: `
    <p>
      editor works!
    </p>
  `,
  styles: []
})
export class EditorComponent implements OnInit {

  constructor(private ns: NotifyService) {
    ns.setTitle('Editor');
   }

  ngOnInit() {
  }

}
