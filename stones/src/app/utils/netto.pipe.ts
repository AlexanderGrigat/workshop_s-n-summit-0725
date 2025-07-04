import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'netto',
  standalone: false
})
export class NettoPipe implements PipeTransform {
  transform(price: number, tax = 19, type: 'brutto' | 'netto' = 'netto'): number {
    if(type === 'brutto') {
      return price * (1 + tax/100);
    } else {
      return price / (1 + tax/100);
    }
  }
}
