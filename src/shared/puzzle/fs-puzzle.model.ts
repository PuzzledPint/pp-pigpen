import { FSHint } from "./fs-hint.model";

export interface FSPuzzle {
  name: string;
  type: string;

  pdf: string;

  hints: FSHint[];
}
