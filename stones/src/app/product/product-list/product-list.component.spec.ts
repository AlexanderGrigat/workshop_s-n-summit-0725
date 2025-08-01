import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from '../product/product.component';
import { provideRouter, RouterLink } from '@angular/router';
import {
  MockProductService,
  ProductService,
} from '../../service/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgClass } from '@angular/common';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        AsyncPipe,
        ProductComponent,
        ProductListComponent,
        NgClass,
        RouterLink,
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly read product list', () => {
    component.products.subscribe((products) => {
      expect(products[0].id).toBe(-1);
    });
  });
});
