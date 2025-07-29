import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductService } from '../../service/product.service';
import { Product } from '../product';

import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form.component';
import { BehaviorSubject, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    ReactiveFormsModule,
    ProductFormComponent,
    AsyncPipe,
  ],
})
export class ProductTableComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #productService = inject(ProductService);

  protected readonly products$ = new BehaviorSubject<Product[]>([]);

  nameFilterCtrl = new FormControl('', { nonNullable: true });
  totalPrice = 0;
  displayedColumns = ['id', 'name', 'price', 'weight'];

  ngOnInit(): void {
    this.nameFilterCtrl.valueChanges
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        startWith(this.nameFilterCtrl.value),
        switchMap((nameFilter) =>
          this.#productService.getListFiltered(nameFilter)
        )
      )
      .subscribe((produts) => {
        this.products$.next(produts);
      });
    this.products$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((products) => {
        this.totalPrice = products
          .map((product) => product.price)
          .reduce((prev, curr) => prev + curr, 0);
      });
  }

  onSaveProduct() {
    // TODO Aufgabe 3 Produkte neu laden
  }
}
