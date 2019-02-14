import { DocumentReference } from '@angular/fire/firestore';

export interface FSPlaytestFeedback {
  puzzleRef: DocumentReference;
  numPlaytesters: number;
  version: string;
  solved: boolean;
  solveMinutes: number;
  difficulty: number;
  fun: number;
  errors: string;
  visual: string;
  general: string;
}
