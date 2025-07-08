import { Routes } from '@angular/router';
import { SignalExamplesComponent } from './signal-examples/signal-examples.component';
import { ObservableExamplesComponent } from './observable-examples/observable-examples.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signals', pathMatch: 'full' },
  { path: 'signals', component: SignalExamplesComponent },
  { path: 'observables', component: ObservableExamplesComponent }
];
