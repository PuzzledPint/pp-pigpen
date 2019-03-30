import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG
import { CarouselModule } from 'primeng/carousel';

import { PuzzleSetsComponent } from './puzzle-sets.component';
import { RefToPuzzlePipe } from './refToPuzzle.pipe';

@NgModule({
  imports: [
    CommonModule,

    CarouselModule,
  ],
  exports: [
    PuzzleSetsComponent,
    RefToPuzzlePipe
  ],
  declarations: [
    PuzzleSetsComponent,
    RefToPuzzlePipe
  ]
})
export class SharedPuzzleModule { }
