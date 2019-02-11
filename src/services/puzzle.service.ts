import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

import { FSPuzzleSet } from "src/models/fs-puzzle-set.model";

export interface PuzzleSet extends FSPuzzleSet { afDoc: AngularFirestoreDocument<FSPuzzleSet>; }

@Injectable({
  providedIn: "root"
})
export class PuzzleService {
  private puzzleSetsCollection: AngularFirestoreCollection<FSPuzzleSet>;
  puzzleSets: Observable<PuzzleSet[]>;
  private _selectedPuzzleSet: Subject<Observable<PuzzleSet> | undefined> = new Subject();
  selectedPuzzleSet = this._selectedPuzzleSet.asObservable();

  constructor(private readonly af: AngularFirestore) {
    this.puzzleSetsCollection = af.collection<FSPuzzleSet>("puzzleSets");
    this.puzzleSets = this.puzzleSetsCollection.snapshotChanges().pipe(
      map(actions => actions.map(
        a => {
          const afDoc: AngularFirestoreDocument<FSPuzzleSet> = af.doc(a.payload.doc.ref);
          const data = a.payload.doc.data() as FSPuzzleSet;
          return { afDoc, ...data };
        })
      )
    );
  }

  static improperSlug(slug: string): boolean {
    return /[^a-z]/.test(slug);
  }


  private static fromFS<T, K extends T>(afDoc: AngularFirestoreDocument<T>): Observable<K>  {
    const obs: Observable<T | undefined> = afDoc.valueChanges();
    return obs.pipe(map(fs => { return { afDoc, ...fs } as unknown as K; }));
  }


  // getPuzzleSet(id: string): Observable<PuzzleSet> {
  //   const doc: AngularFirestoreDocument<FSPuzzleSet> = this.puzzleSetsCollection.doc(id);
  //   return PuzzleService.fromFS<FSPuzzleSet, PuzzleSet>(doc);
  // }


  // Public interface

  addPuzzleSet() {
    this.puzzleSetsCollection.add(
      {
        name: "",
        slug: "",
        playtesting: false,
        archives: false,
        polaroid: "/assets/images/nopolaroid.png",
        month: new Date().getFullYear() + "-01",
        puzzleRefs: []
      }).then(docRef => this._selectedPuzzleSet.next(PuzzleService.fromFS<FSPuzzleSet, PuzzleSet>(this.af.doc(docRef))));
  }

  updatePuzzleSet(set: PuzzleSet) {
    const { afDoc, ...fsPuzzleSet } = set;
    afDoc.set(fsPuzzleSet);
  }

  selectPuzzleSet(set: PuzzleSet) {
    this._selectedPuzzleSet.next(PuzzleService.fromFS(set.afDoc));
  }

  async isSetSlugUnique(slug: string): Promise<boolean> {
    const sets: PuzzleSet[] = await this.puzzleSets.toPromise();
    return sets.find(set => set.slug === slug) ? true : false;
  }
}
