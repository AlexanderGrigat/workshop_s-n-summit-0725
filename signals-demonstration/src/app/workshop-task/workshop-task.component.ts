import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  take
} from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-workshop-task",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./workshop-task.component.html",
  styleUrl: "./workshop-task.component.css"
})
export class WorkshopTaskComponent implements OnInit, OnDestroy {
  // For cleanup when the component is destroyed
  private destroy$ = new Subject<void>();

  // Search functionality with Observables
  #searchTerm$ = new BehaviorSubject<string>("");
  searchTerm$ = this.#searchTerm$.asObservable();

  // List of items
  #items$ = new BehaviorSubject<string[]>([
    "Angular",
    "React",
    "Vue",
    "Svelte",
    "Ember",
    "Backbone",
    "jQuery",
    "Vanilla JS",
    "TypeScript",
    "JavaScript"
  ]);
  items$ = this.#items$.asObservable();

  // Filtered items based on search term
  filteredItems$: Observable<string[]>;

  // Count of filtered items
  filteredCount$: Observable<number>;

  constructor() {
    // Set up derived observables with pipe operators
    this.filteredItems$ = combineLatest([
      this.items$,
      this.searchTerm$.pipe(
        distinctUntilChanged() // Only emit when the value changes
      )
    ]).pipe(
      map(([items, searchTerm]) => {
        if (!searchTerm.trim()) {
          return items;
        }
        const term = searchTerm.toLowerCase();
        return items.filter(item => item.toLowerCase().includes(term));
      })
    );

    // Count of filtered items
    this.filteredCount$ = this.filteredItems$.pipe(
      map(items => items.length)
    );
  }

  ngOnInit(): void {
    // Log when search term changes
    this.searchTerm$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(term => {
      console.log(`[Workshop] Search term changed to: ${term}`);
    });

    // Log when filtered items change
    this.filteredItems$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(items => {
      console.log(`[Workshop] Filtered items count: ${items.length}`);
    });
  }

  setSearchTerm(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.#searchTerm$.next(target.value);
  }

  addItem(): void {
    this.searchTerm$.pipe(take(1)).subscribe(term => {
      if (term.trim()) {
        this.items$.pipe(take(1)).subscribe(currentItems => {
          if (!currentItems.includes(term)) {
            this.#items$.next([...currentItems, term]);
            this.#searchTerm$.next("");
          }
        });
      }
    });
  }

  removeItem(item: string): void {
    this.items$.pipe(take(1)).subscribe(currentItems => {
      const updatedItems = currentItems.filter(i => i !== item);
      this.#items$.next(updatedItems);
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
