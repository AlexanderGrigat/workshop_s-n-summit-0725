import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ObservableInputsComponent } from '../observable-inputs/observable-inputs.component';

@Component({
  selector: 'app-observable-examples',
  standalone: true,
  imports: [CommonModule, FormsModule, ObservableInputsComponent],
  templateUrl: './observable-examples.component.html',
  styleUrl: './observable-examples.component.css'
})
export class ObservableExamplesComponent implements OnInit, OnDestroy {
  // For cleanup when component is destroyed
  private destroy$ = new Subject<void>();

  // SECTION 1: Basic Observables
  title$ = new BehaviorSubject<string>('RxJS Observables Demonstration');
  input1$ = new BehaviorSubject<number>(0);
  input2$ = new BehaviorSubject<number>(0);

  // SECTION 2: Derived Observables
  output$: Observable<number>;
  untrackedOutput$: Observable<number>;

  // SECTION 3: Observable Side Effects
  // These will be set up in ngOnInit

  // SECTION 4: Observable Collections
  todoList$ = new BehaviorSubject<Array<{ id: number, text: string, completed: boolean }>>([
    { id: 1, text: 'Erstelle Präsentation für Freitagsvortrag', completed: true },
    { id: 2, text: 'Stelle Observables vor', completed: false }
  ]);
  newTodoText$ = new BehaviorSubject<string>('');

  // Computed observables for todo stats
  completedCount$: Observable<number>;
  remainingCount$: Observable<number>;

  // SECTION 5: Observable Inputs
  parentData$ = new BehaviorSubject<string>('Daten vom Elternteil (Observable)');
  userName$ = new BehaviorSubject<string>('');

  constructor() {
    // Set up derived observables
    this.output$ = combineLatest([this.input1$, this.input2$]).pipe(
      map(([input1, input2]) => input1 + input2)
    );

    // Untracked version - we'll simulate this by only using input1
    this.untrackedOutput$ = this.input1$.pipe(
      map(input1 => input1 + this.input2$.getValue())
    );

    // Set up computed observables for todo stats
    this.completedCount$ = this.todoList$.pipe(
      map(todos => todos.filter(todo => todo.completed).length)
    );

    this.remainingCount$ = combineLatest([this.todoList$, this.completedCount$]).pipe(
      map(([todos, completedCount]) => todos.length - completedCount)
    );
  }

  ngOnInit(): void {
    // SECTION 3: Observable Side Effects
    // Effect 1: Log when input1 changes
    this.input1$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      console.log(`[Observable] Input 1 changed to: ${value}`);
    });

    // Effect 2: Log when either input changes
    combineLatest([this.input1$, this.input2$]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([input1, input2]) => {
      console.log(`[Observable] Inputs changed - input1: ${input1}, input2: ${input2}`);
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  addInput1(): void {
    this.input1$.next(this.input1$.getValue() + 1);
  }

  addInput2(): void {
    this.input2$.next(this.input2$.getValue() + 1);
  }

  addTodo(): void {
    const text = this.newTodoText$.getValue().trim();
    if (text) {
      const currentTodos = this.todoList$.getValue();
      const newId = currentTodos.length > 0 ? Math.max(...currentTodos.map(t => t.id)) + 1 : 1;

      this.todoList$.next([
        ...currentTodos,
        {
          id: newId,
          text: text,
          completed: false
        }
      ]);

      this.newTodoText$.next('');
    }
  }

  toggleTodo(id: number): void {
    const currentTodos = this.todoList$.getValue();
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    this.todoList$.next(updatedTodos);
  }

  removeTodo(id: number): void {
    const currentTodos = this.todoList$.getValue();
    const filteredTodos = currentTodos.filter(todo => todo.id !== id);

    this.todoList$.next(filteredTodos);
  }

  setNewTodoText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newTodoText$.next(target.value);
  }

  updateUserName(newName: string): void {
    this.userName$.next(newName);
  }

  setUserName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.userName$.next(target.value);
  }
}
