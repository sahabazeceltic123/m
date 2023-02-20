import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from './uppercase.directive';
import { CommaSeperatorPipe } from './comman-seperator';


@NgModule({
  declarations: [UppercaseDirective,CommaSeperatorPipe],
  imports: [  ],
  exports: [UppercaseDirective,CommaSeperatorPipe]
})
export class ShareModule { }
