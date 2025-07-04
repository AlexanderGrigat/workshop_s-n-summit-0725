import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'stn-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;
  @Output() priceChange = new EventEmitter<number>();
  showPrice = true;

  styleConfig: any = {
    borderStyle: 'dashed',
  }

  increasePrice(): void {
    this.product.price += 5;
    this.priceChange.emit(this.product.price);
  }

  changePrice(price: number){
    this.product.price = price;
    this.priceChange.emit(this.product.price);
  }

  togglePrice(){
    this.showPrice = !this.showPrice;
  }
}
