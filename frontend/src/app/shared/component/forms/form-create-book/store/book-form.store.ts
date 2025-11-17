import { Injectable, signal, computed } from '@angular/core';
import { BookCreationDTO } from '../model/BookCreationDTO';
import { BookFactory } from '../factories/book.factory';

export type BookFormMode = 'create' | 'edit';

export interface BookFormState {
  book: BookCreationDTO;
  mode: BookFormMode;
  isSubmitting: boolean;
  error: string | null;
}

@Injectable()
export class BookFormSignalStore {
  // Private signals for state management
  private readonly state = signal<BookFormState>({
    book: BookFactory.createEmptyBook(),
    mode: 'create',
    isSubmitting: false,
    error: null
  });

  // Public read-only computed signals
  readonly book = computed(() => this.state().book);
  readonly mode = computed(() => this.state().mode);
  readonly isSubmitting = computed(() => this.state().isSubmitting);
  readonly error = computed(() => this.state().error);
  readonly isEditMode = computed(() => this.state().mode === 'edit');
  readonly isCreateMode = computed(() => this.state().mode === 'create');

  /**
   * Initialize the store for creating a new book
   */
  initializeForCreate(): void {
    this.state.set({
      book: BookFactory.createEmptyBook(),
      mode: 'create',
      isSubmitting: false,
      error: null
    });
  }

  /**
   * Initialize the store for editing an existing book
   */
  initializeForEdit(book: BookCreationDTO): void {
    console.log('Store - initializeForEdit called with:', book);
    const clonedBook = BookFactory.cloneBook(book);
    console.log('Store - cloned book:', clonedBook);
    this.state.set({
      book: clonedBook,
      mode: 'edit',
      isSubmitting: false,
      error: null
    });
    console.log('Store - state after set:', this.state());
  }

  /**
   * Update the book with partial changes
   */
  updateBook(updates: Partial<BookCreationDTO>): void {
    this.state.update(currentState => ({
      ...currentState,
      book: {
        ...currentState.book,
        ...updates
      }
    }));
  }

  /**
   * Set the submission state
   */
  setSubmitting(isSubmitting: boolean): void {
    this.state.update(currentState => ({
      ...currentState,
      isSubmitting
    }));
  }

  /**
   * Set an error message
   */
  setError(error: string | null): void {
    this.state.update(currentState => ({
      ...currentState,
      error
    }));
  }

  /**
   * Reset the store to initial state
   */
  reset(): void {
    this.state.set({
      book: BookFactory.createEmptyBook(),
      mode: 'create',
      isSubmitting: false,
      error: null
    });
  }
}
