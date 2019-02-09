import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { FSPuzzleSet } from "src/models/fs-puzzle-set.model";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { reject } from "bluebird";

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  private puzzleSetsCollection: AngularFirestoreCollection<FSPuzzleSet>;
  puzzleSets: FSPuzzleSet[];
  puzzleSetAdded: Subject<string> = new Subject();

  constructor(private af: AngularFirestore) {
    this.puzzleSetsCollection = af.collection<FSPuzzleSet>('puzzleSets');
    this.puzzleSets = [];
  }

  async addPuzzleSet(slug: string): Promise<void> {
    if (this.improperSlug(slug)) {
      return reject("PuzzleService: tried to add PuzzleSet with invalid slug.");
    }

    const doc = await this.puzzleSetsCollection.doc(slug);
    if (await this.checkExists(this.puzzleSetsCollection, slug)) {
      return reject("PuzzleService: tried to add PuzzleSet when slug already exists.");
    }

    doc.set({});
    this.puzzleSetAdded.next(slug);
    return;
  }

  improperSlug(slug: string): boolean {
    return (/[^a-z]/.test(slug));
  }

  async checkExists<T>(collection: AngularFirestoreCollection<T>, slug: string): Promise<boolean> {
    const doc = collection.doc<T>(slug);
    const check = await doc.get().toPromise();

    return check.exists;
  }
}
