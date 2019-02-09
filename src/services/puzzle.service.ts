import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { FSPuzzleSet } from "src/models/fs-puzzle-set.model";
import { Observable } from "rxjs";
import { reject } from "bluebird";

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  private puzzleSetsCollection: AngularFirestoreCollection<FSPuzzleSet>;
  puzzleSets: Observable<FSPuzzleSet[]>;

  constructor(private af: AngularFirestore) {
    this.puzzleSetsCollection = af.collection<FSPuzzleSet>('puzzleSets');
    this.puzzleSets = this.puzzleSetsCollection.valueChanges();
  }

  async addPuzzleSet(slug: string, newPuzzleSet: FSPuzzleSet): Promise<void> {
    if (this.improperSlug(slug)) {
      return reject("PuzzleService: tried to add PuzzleSet with invalid slug.");
    }

    const doc = await this.puzzleSetsCollection.doc(slug);
    if (await this.checkExists(this.puzzleSetsCollection, slug)) {
      return reject("PuzzleService: tried to add PuzzleSet when slug already exists.");
    }

    return doc.set(newPuzzleSet);
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
