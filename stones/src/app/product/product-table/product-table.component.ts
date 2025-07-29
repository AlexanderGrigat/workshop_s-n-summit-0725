import { Component, computed, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductService } from '../../service/product.service';

import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'stn-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CurrencyPipe,
    MatFormField,
    MatLabel,
    MatInput,
    MatProgressBar,
    FormsModule,
    ProductFormComponent,
  ],
})
export class ProductTableComponent {
  nameFilter = signal<string>('');
  productsResource = inject(ProductService).getListFiltered(
    this.nameFilter
  );
  totalPrice = computed(() => this.productsResource.value().map(product => product.price).reduce((prev, curr) => prev + curr, 0))
  displayedColumns = ['id', 'name', 'price', 'weight'];

  onSaveProduct() {
    this.productsResource.reload();
  }
}
