import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductComponent } from './product.component';
import { Product } from '../product';
import { By } from '@angular/platform-browser';
import { UtilsModule } from '../../utils/utils.module';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [UtilsModule, MatInputModule, MatFormFieldModule]
     })
     .compileComponents();
 
     fixture = TestBed.createComponent(ProductComponent);
     component = fixture.componentInstance;
     component.product = new Product(12,'SuperStein', 1, 1);
     fixture.detectChanges();
   });
 
   it('should create', () => {
     expect(component).toBeTruthy();
   });
 
   it('should correctly show name in DOM', () => {
     const liName = fixture.debugElement.query(By.css('#name'));
     expect(liName.nativeElement.textContent).toContain(component.product.name);
   });
 
   it('raisePrice should raise price by 5', () => {
     const oldPrice = component.product.price;
     component.increasePrice();
     expect(component.product.price).toBe(oldPrice + 5);
   });
 });
