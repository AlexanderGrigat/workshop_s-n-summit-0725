import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NettoPipe } from '../../utils/netto.pipe';

@Component({
  selector: 'stn-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  imports:[
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NettoPipe,
  ],
})
export class ProductComponent {
  @Input({required: true}) product!: Product;
  @Output() priceChange = new EventEmitter<number>();
  showPrice = true;

  styleConfig: any = {
    borderStyle: 'dashed',
  }

  togglePrice(){
    this.showPrice = !this.showPrice;
  }
}
