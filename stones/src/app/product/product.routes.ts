import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { hasSavedGuard } from '../utils/has-saved.guard';
import { Routes } from '@angular/router';
import { ProductTableComponent } from './product-table/product-table.component';

export const productRoutes: Routes = [{
  path: 'products',
  children: [
    {path: '', component: ProductListComponent},
    {path: 'new', component: ProductFormComponent, canDeactivate: [hasSavedGuard]},
    {path: 'new/:id', component: ProductFormComponent, canDeactivate: [hasSavedGuard]},
    {path: 'table', component: ProductTableComponent},
  ]
}];
