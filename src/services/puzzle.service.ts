import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, tap, shareReplay, filter } from "rxjs/operators";

import { FSPuzzleSet } from "src/models/fs-puzzle-set.model";
import { FSPuzzle } from "src/models/fs-puzzle.model";
import { Util } from './util';

export interface PuzzleSet extends FSPuzzleSet { afDoc: AngularFirestoreDocument<FSPuzzleSet>; }
export interface Puzzle extends FSPuzzle { afDoc: AngularFirestoreDocument<FSPuzzle>; }

@Injectable({
  providedIn: "root"
})
export class PuzzleService {
  private puzzleSetsCollection: AngularFirestoreCollection<FSPuzzleSet>;
  public puzzleSets: Observable<PuzzleSet[]>;
  public playtestingSets: Observable<PuzzleSet[]>;

  private _selectedPuzzleSet: Subject<Observable<PuzzleSet> | undefined> = new Subject();
  public selectedPuzzleSet = this._selectedPuzzleSet.asObservable();

  private _selectedPuzzle: BehaviorSubject<Puzzle | undefined> = new BehaviorSubject<Puzzle | undefined>(undefined);
  public selectedPuzzle = this._selectedPuzzle.asObservable();

  private puzzlesCollection: AngularFirestoreCollection<FSPuzzle>;


  constructor(private readonly af: AngularFirestore) {
    this.puzzleSetsCollection = af.collection<FSPuzzleSet>("puzzleSets");
    this.puzzleSets = this.puzzleSetsCollection.snapshotChanges().pipe(
      tap(arr => console.log(`read ${arr.length} docs from puzzleSets collection`)),
      map(actions => actions.map(
        a => {
          const afDoc: AngularFirestoreDocument<FSPuzzleSet> = af.doc(a.payload.doc.ref);
          const data = a.payload.doc.data() as FSPuzzleSet;
          return { afDoc, ...data };
        })
      ),
      shareReplay(1)
    );
    this.playtestingSets = this.puzzleSets.pipe(
      map(sets => sets.filter(set => set.playtesting)));

    this.puzzlesCollection = af.collection<FSPuzzle>("puzzles");
  }



  // getPuzzleSet(id: string): Observable<PuzzleSet> {
  //   const doc: AngularFirestoreDocument<FSPuzzleSet> = this.puzzleSetsCollection.doc(id);
  //   return PuzzleService.fromFS<FSPuzzleSet, PuzzleSet>(doc);
  // }


  // Public interface

  public addPuzzleSet() {
    this.puzzleSetsCollection.add(
      {
        name: "",
        slug: "",
        playtesting: false,
        onhomepage: false,
        archives: false,
        polaroid: "/assets/images/nopolaroid.png",
        month: new Date().getFullYear() + "-01",
        puzzleRefs: []
      }).then(docRef => this._selectedPuzzleSet.next(Util.fromFS<FSPuzzleSet, PuzzleSet>(this.af.doc(docRef))));
  }

  public addPuzzle(): Promise<DocumentReference> {
    return this.puzzlesCollection.add(
      {
        name: "",
        type: "Main Set",
        pdf: "",

        hints: [{ title: 'ANSWER', text: 'Answer should be here' }]
      });
  }

  public updatePuzzleSet(set: PuzzleSet) {
    const { afDoc, ...fsPuzzleSet } = set;
    afDoc.set(fsPuzzleSet);
  }

  public updatePuzzle(puzzle: Puzzle) {
    const { afDoc, ...fsPuzzle } = puzzle;
    afDoc.set(fsPuzzle);
  }

  public selectPuzzleSet(set: PuzzleSet) {
    this._selectedPuzzleSet.next(Util.fromFS(set.afDoc));
  }

  public selectPuzzle(puzzle: Puzzle | undefined) {
    this._selectedPuzzle.next(puzzle);
  }

  public async isSetSlugUnique(slug: string): Promise<boolean> {
    const sets: PuzzleSet[] = await this.puzzleSets.toPromise();
    return sets.find(set => set.slug === slug) ? true : false;
  }

  public getPuzzle(ref: DocumentReference): Observable<Puzzle> {
    const doc = this.af.doc<FSPuzzle>(ref);
    return Util.fromFS<FSPuzzle, Puzzle>(doc);
  }

}
