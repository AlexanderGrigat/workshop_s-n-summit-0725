import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NettoPipe } from './netto.pipe';



@NgModule({
  declarations: [
    NettoPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NettoPipe,
  ]
})
export class UtilsModule { }
