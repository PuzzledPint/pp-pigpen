import { Observable } from "rxjs";
import { first } from 'rxjs/operators';

export async function nextAsPromise<T>(obs: Observable<T>): Promise<T> {
  return await obs.pipe(first()).toPromise<T>();
}
