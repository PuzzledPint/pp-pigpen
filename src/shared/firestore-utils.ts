import { Observable } from "rxjs";
import { AngularFirestoreDocument } from "@angular/fire/firestore";
import { map, shareReplay } from "rxjs/operators";

export function fromFS<T, K extends T>(afDoc: AngularFirestoreDocument<T>): Observable<K> {
  const obs: Observable<T | undefined> = afDoc.valueChanges();
  return obs.pipe(
    map(fs => {
      return ({ afDoc, ...fs } as unknown) as K;
    }),
    shareReplay(1)
  );
}



