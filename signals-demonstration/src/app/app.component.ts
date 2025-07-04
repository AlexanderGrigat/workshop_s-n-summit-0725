import { Component } from "@angular/core";

import { ObservableExamplesComponent } from "./observable-examples/observable-examples.component";
import { SignalExamplesComponent } from "./signal-examples/signal-examples.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ObservableExamplesComponent, SignalExamplesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Signals und Observables Demonstration';
}
