import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from '../product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../../utils/utils.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideRouter, RouterModule } from '@angular/router';
import { MockProductService, ProductService } from '../../service/product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductListComponent,
        ProductComponent,
      ],
      imports:[
        ReactiveFormsModule,
        UtilsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers:[{provide: ProductService, useClass: MockProductService},provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly read product list', () => {
    component.products.subscribe(products => {
      expect(products[0].id).toBe(-1);
    })
  });
});
