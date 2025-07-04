import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-observable-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './observable-inputs.component.html',
  styleUrl: './observable-inputs.component.css'
})
export class ObservableInputsComponent implements OnInit {
  // Example of @Input (read-only from parent)
  @Input() parentData: string = 'Default value';
  parentData$ = new BehaviorSubject<string>('Default value');

  // Example of two-way binding with parent
  @Input() userName: string = '';
  @Output() userNameChange = new EventEmitter<string>();
  userName$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    // Initialize BehaviorSubjects with input values
    this.parentData$.next(this.parentData);
    this.userName$.next(this.userName);
  }

  // Method to demonstrate updating a model
  updateUserName(newName: string): void {
    this.userName$.next(newName);
    this.userNameChange.emit(newName);
  }

  // Helper method to handle input events
  setUserName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.updateUserName(target.value);
  }
}
