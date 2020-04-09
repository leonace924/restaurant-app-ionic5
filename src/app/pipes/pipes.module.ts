import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from './translation.pipe';  //our pipe which we generate

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TranslationPipe],
  exports: [TranslationPipe]
})
export class PipesModule { }