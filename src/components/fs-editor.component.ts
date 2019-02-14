import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-fs-editor',
  template: `
  <p-editor [(ngModel)]="text" [style]="{'height':'320px'}"></p-editor>
  `,
  styles: []
})
export class FsEditorComponent implements OnInit {
  @Input() doc: AngularFirestoreDocument | undefined;
  @Input() field: string | undefined;

  constructor() {
  }

  ngOnInit() {
  }

  Save() {

  }
}
