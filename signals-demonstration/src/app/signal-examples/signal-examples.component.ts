import { Component, computed, effect, signal, untracked } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SignalInputsComponent } from "../signal-inputs/signal-inputs.component";

@Component({
  selector: 'app-signal-examples',
  standalone: true,
  imports: [CommonModule, FormsModule, SignalInputsComponent],
  templateUrl: './signal-examples.component.html',
  styleUrl: './signal-examples.component.css'
})
export class SignalExamplesComponent {
  // SECTION 1: Basic Signals
  // Basic signals are created with the signal() function and can be updated with set() or update()
  title = signal('Angular Signals Demonstration');
  input1 = signal(0);
  input2 = signal(0);

  // SECTION 2: Computed Signals
  // Computed signals derive their value from other signals and automatically update when dependencies change
  output = computed(() => this.input1() + this.input2());

  // Using untracked to prevent a signal from triggering updates
  untrackedOutput = computed(() => this.input1() + untracked(this.input2));

  // SECTION 3: Signal Effects
  //  run side effects when their dependent signals change
  constructor() {
    // This effect logs to the console whenever input1 changes
    effect(() => {
      console.log(`Input 1 changed to: ${this.input1()}`);
    });

    // This effect logs when either input changes
    effect(() => {
      console.log(`Inputs changed - input1: ${this.input1()}, input2: ${this.input2()}`);
    });
  }

  addInput1() {
    // Two ways to update a signal:
    // 1. Using set() to directly set a new value
    // this.input1.set(this.input1() + 1);

    // 2. Using update() to compute a new value based on the current one
    this.input1.update(value => value + 1);
  }

  addInput2() {
    this.input2.update(value => value + 1);
  }

  // SECTION 4: Signal Collections
  // Signals can hold collections like arrays and objects
  todoList = signal([
    { id: 1, text: 'Erstelle Präsentation für Freitagsvortrag', completed: true },
    { id: 2, text: 'Stelle Signals vor', completed: false }
  ]);

  newTodoText = signal('');

  addTodo() {
    if (this.newTodoText().trim()) {
      this.todoList.update(todos => [
        ...todos,
        {
          id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
          text: this.newTodoText(),
          completed: false
        }
      ]);
      this.newTodoText.set('');
    }
  }

  toggleTodo(id: number) {
    this.todoList.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  removeTodo(id: number) {
    this.todoList.update(todos => todos.filter(todo => todo.id !== id));
  }

  // Computed signal for completed todos count
  completedCount = computed(() =>
    this.todoList().filter(todo => todo.completed).length
  );

  // Computed signal for remaining todos count
  remainingCount = computed(() =>
    this.todoList().length - this.completedCount()
  );

  // SECTION 5: Signal Inputs
  // @input() and @model() are used for component inputs with signal semantics
  // These would typically be used in child components, shown here for demonstration

  // Parent data to be passed to the child component
  parentData = signal<string>('Daten vom Elternteil');

  // Username for two-way binding with the child component
  userName = signal<string>('');

  updateUserName(newName: string) {
    this.userName.set(newName);
  }

  setNewTodoText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newTodoText.set(target.value);
  }
}
