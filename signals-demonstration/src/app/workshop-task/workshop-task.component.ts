import { Component, computed, effect, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-workshop-task",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./workshop-task.component.html",
  styleUrl: "./workshop-task.component.css"
})
export class WorkshopTaskComponent {
  searchTerm = signal<string>("");

  items = signal<string[]>([
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

  filteredItems = computed(() =>
  {
    const items = this.items();
    const searchTerm = this.searchTerm();
    if(!searchTerm.trim()) {
      return items;
    }
    const term = searchTerm.toLowerCase();
    return items.filter(item => item.toLowerCase().includes(term));
  })

  filteredCount = computed(() => this.filteredItems().length);

  logSearchTermEffect = effect(() => {
    console.log(`[Workshop] Search term: ${this.searchTerm()}`);
  });

  logFilteredItemsEffect = effect(() => {
    console.log(`[Workshop] Filtered items: ${this.filteredItems()}`);
  });


  setSearchTerm(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  addItem(): void {
    const term = this.searchTerm();
    const items = this.items();
    if (term.trim()) {
      if (!items.includes(term)) {
        this.items.set([...items, term]);
        this.searchTerm.set("");
      }
    }
  }

  removeItem(item: string): void {
    const updatedItems = this.items().filter(i => i !== item);
    this.items.set(updatedItems);
  }
}
