import { Pipe, PipeTransform } from '@angular/core';
import { PuzzleService } from "src/services/puzzle.service";
import { Observable } from "rxjs";
import { DocumentReference } from "@angular/fire/firestore";

@Pipe({
  name: 'refToPuzzle'
})
export class RefToPuzzlePipe implements PipeTransform {

  constructor(private ps: PuzzleService) {}

  transform(ref: DocumentReference): Observable<any> {
    return this.ps.getPuzzle(ref);
  }
}

