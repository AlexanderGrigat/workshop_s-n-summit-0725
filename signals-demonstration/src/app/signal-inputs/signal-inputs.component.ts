import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signal-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signal-inputs.component.html',
  styleUrl: './signal-inputs.component.css'
})
export class SignalInputsComponent {
  // Example of @input() (read-only from parent)
  readonly parentData = input<string>('Default value');

  // Example of @model() (two-way binding with parent)
  userName = model<string>('');

  // Method to demonstrate updating a model
  updateUserName(newName: string) {
    this.userName.set(newName);
  }

  // Helper method to handle input events
  setUserName(event: Event) {
    const target = event.target as HTMLInputElement;
    this.userName.set(target.value);
  }
}
