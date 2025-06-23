import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { hasSavedGuard } from '../utils/has-saved.guard';
import { Routes } from '@angular/router';

export const productRoutes: Routes = [{
  path: 'products',
  children: [
    {path: '', component: ProductListComponent},
    {path: 'new', component: ProductFormComponent, canDeactivate: [hasSavedGuard]},
    {path: 'new/:id', component: ProductFormComponent, canDeactivate: [hasSavedGuard]},
  ]
}];
