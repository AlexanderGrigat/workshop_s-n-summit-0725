import {  Routes } from '@angular/router';
import { productRoutes } from './product/product.routes';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  ...productRoutes
];
