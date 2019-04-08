import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from "rxjs";
import { DocumentReference } from "@angular/fire/firestore";
import { PuzzleService } from './puzzle.service';

@Pipe({
  name: 'refToPuzzle'
})
export class RefToPuzzlePipe implements PipeTransform {

  constructor(private ps: PuzzleService) {}

  public transform(ref: DocumentReference): Observable<any> {
    return this.ps.getPuzzle(ref);
  }
}

