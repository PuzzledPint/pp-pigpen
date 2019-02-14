import { Component, OnInit, Input } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-puzzle-feedback',
  template: `
    <p>
      puzzle-feedback works!
    </p>
  `,
  styles: []
})
export class PuzzleFeedbackComponent implements OnInit {
  @Input() puzzleRef: DocumentReference | undefined;

  constructor() { }

  ngOnInit() {
  }

}
