import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { UtilsModule } from '../utils/utils.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductFormComponent,
    ProductListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProductRoutingModule,
    UtilsModule,
    ProductRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    ProductComponent,
    ProductFormComponent,
  ]
})
export class ProductModule { }
