import { inject, Injectable } from '@angular/core';
import { Product } from '../product/product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly api = 'https://stone-server.onrender.com/products'

  getList(): Observable<Product[]>{
    return this.http.get<Product[]>(this.api);
  }

  getListFiltered(nameFilter: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.api, {params: {name: nameFilter}});
  }

  addProduct(product: Partial<Product>): Observable<void>{
    return this.http.post<void>(this.api, product);
  }
}

export class MockProductService{
  getList(): Observable<Product[]>{
    return of([
      {
        id: -1,
        name: 'test',
        price: 1,
        weight: 2,
      }
    ])
  }
  newProduct(product: Product): Observable<void>{
    return of();
  }
}
