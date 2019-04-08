import { DocumentReference } from "@angular/fire/firestore";

export interface FSPuzzleSet {
  name: string;
  slug: string;

  playtesting: boolean; // IS it in active playtesting?
  onhomepage: boolean; // is it on the home page?
  archives: boolean; // Is it in  he archives?
  polaroid: string; // URL
  month: string; // format is YYYY-MM

  puzzleRefs: DocumentReference[];
}
