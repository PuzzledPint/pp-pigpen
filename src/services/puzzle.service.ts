import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { FSPuzzleSet } from "src/models/fs-puzzle-set.model";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { reject } from "bluebird";

@Injectable({
  providedIn: "root"
})
export class PuzzleService {
  private puzzleSetsCollection: AngularFirestoreCollection<FSPuzzleSet>;
  puzzleSets: Set<string> = new Set();
  puzzleSetAdded: Subject<string> = new Subject();


  constructor(private af: AngularFirestore) {
    this.puzzleSetsCollection = af.collection<FSPuzzleSet>("puzzleSets");
    this.puzzleSetsCollection.snapshotChanges().subscribe(dca =>
      dca.map(action => {
        const change = action.payload;
        const set = change.doc.id;
        switch (change.type) {
          case 'added': {
            this.puzzleSets.add(set); break;
          }
          case 'removed': { this.puzzleSets.delete(set); break; }
        }
      })
    );
  }

  getSet(slug: string): Observable<FSPuzzleSet | undefined> {
    return this.puzzleSetsCollection.doc<FSPuzzleSet>(slug).valueChanges();
  }

  async addPuzzleSet(slug: string): Promise<void> {
    if (this.improperSlug(slug)) {
      return reject("PuzzleService: tried to add PuzzleSet with invalid slug.");
    }

    const doc = await this.puzzleSetsCollection.doc(slug);
    if (await this.checkExists(this.puzzleSetsCollection, slug)) {
      return reject(
        "PuzzleService: tried to add PuzzleSet when slug already exists."
      );
    }

    doc.set({});
    this.puzzleSetAdded.next(slug);
    return;
  }

  improperSlug(slug: string): boolean {
    return /[^a-z]/.test(slug);
  }

  async checkExists<T>(
    collection: AngularFirestoreCollection<T>,
    slug: string
  ): Promise<boolean> {
    const doc = collection.doc<T>(slug);
    const check = await doc.get().toPromise();

    return check.exists;
  }
}
