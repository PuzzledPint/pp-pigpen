export interface FSPuzzleSet {
  name: string;
  slug: string;

  playtesting: boolean; // IS it in active playtesting?
  archives: boolean; // Is it in  he archives?
  polaroid: string; // URL
  month: string; // format is YYYY-MM

  puzzleRefs: string[];
}
