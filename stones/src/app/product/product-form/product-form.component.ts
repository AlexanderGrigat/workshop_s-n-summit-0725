import { CustomValidators } from './../../utils/custom-validators';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'stn-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class ProductFormComponent {
  @Output() saveProduct = new EventEmitter<void>();
  id = -1;

  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);

  productForm = this.fb.group({
    name: ['', [Validators.required, CustomValidators.alphaNum]],
    price: [0, [Validators.required, CustomValidators.positiv]],
    weight: [0, [Validators.required]],
  });

  constructor() {
    inject(ActivatedRoute).paramMap.subscribe((paramMap) => {
      const idParam = paramMap.get('id');
      if (idParam) {
        this.id = +idParam;
      }
    });
  }

  save() {
    const formValue = this.productForm.value;
    if (
      this.productForm.valid &&
      formValue.name &&
      formValue.price &&
      formValue.weight
    ) {
      const product = {
        name: formValue.name,
        price: formValue.price,
        weight: formValue.weight,
      };
      this.productService.addProduct(product).subscribe(() => this.saveProduct.emit());
      this.productForm.reset();
    }
  }

  hasSaved() {
    const formValue = this.productForm.value;
    if (!formValue.name && !formValue.price && !formValue.weight) {
      return true;
    } else {
      return confirm(
        'Du hast ungespeicherte Daten, willst du die wirklich löschen?'
      );
    }
  }
}
