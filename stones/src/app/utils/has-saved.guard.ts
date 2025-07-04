import { CanDeactivateFn } from '@angular/router';
import { ProductFormComponent } from '../product/product-form/product-form.component';

export const hasSavedGuard: CanDeactivateFn<ProductFormComponent> = 
(component, currentRoute, currentState, nextState) => {
  return component.hasSaved();
};
