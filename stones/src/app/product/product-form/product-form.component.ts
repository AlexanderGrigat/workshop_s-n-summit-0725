import { CustomValidators } from './../../utils/custom-validators';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'stn-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() saveProduct = new EventEmitter<Product>();
  id = -1;
  nameReversed = '';
  nameLength = 0;

  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);

  // productForm = new FormGroup({
     // name: new FormControl('', [Validators.required, CustomValidators.alphaNum]),
     // price: new FormControl(0, [Validators.required, CustomValidators.positiv]),
     // weight: new FormControl(0, [Validators.required]),
   // })

   productForm = this.fb.group({
     name: ['', [Validators.required, CustomValidators.alphaNum]],
     price: [0, [Validators.required, CustomValidators.positiv]],
     weight: [0, [Validators.required]],
   });

  constructor(){
      this.productForm.controls.name.valueChanges.pipe(map (n => 
      n?.toString().split('').reverse().join('')))
      .subscribe(value => this.nameReversed = value ?? '');

      this.productForm.controls.name.valueChanges.subscribe((value) => {
        this.nameLength = value ? value.length : 0;
      });
    
      inject(ActivatedRoute).paramMap.subscribe(paramMap => {
        const idParam = paramMap.get('id');
        if(idParam){
          this.id = +idParam;
        }
      });
  }
  
  save(){
    const formValue = this.productForm.value;
    if (this.productForm.valid && formValue.name && formValue.price && formValue.weight) {
    const product = {
      name: formValue.name,
      price: formValue.price,
      weight: formValue.weight,
    };
    this.productService.addProduct(product).subscribe();
    this.productForm.reset();
  }
  }

  hasSaved(){
    const formValue = this.productForm.value;
    if(!formValue.name && !formValue.price && !formValue.weight){
      return true;
    } else{
      return confirm('Du hast ungespeicherte Daten, willst du die wirklich löschen?')
    }
  }
}
