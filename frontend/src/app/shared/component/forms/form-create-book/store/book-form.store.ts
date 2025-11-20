import {computed, Injectable, signal} from '@angular/core';
import {BookCreationDTO} from '../model/BookCreationDTO';
import {BookFactory} from '../factories/book.factory';

export type BookFormMode = 'create' | 'edit';

export interface BookFormState {
  book: BookCreationDTO;
  mode: BookFormMode;
  isSubmitting: boolean;
  error: string | null;
}

@Injectable()
export class BookFormSignalStore {

  private readonly state = signal<BookFormState>({
    book: BookFactory.createEmptyBook(),
    mode: 'create',
    isSubmitting: false,
    error: null
  });

  readonly book = computed(() => this.state().book);
  readonly mode = computed(() => this.state().mode);
  readonly isSubmitting = computed(() => this.state().isSubmitting);
  readonly error = computed(() => this.state().error);
  readonly isEditMode = computed(() => this.state().mode === 'edit');
  readonly isCreateMode = computed(() => this.state().mode === 'create');


  initializeForCreate(): void {
    this.state.set({
      book: BookFactory.createEmptyBook(),
      mode: 'create',
      isSubmitting: false,
      error: null
    });
  }


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
  }


  updateBook(updates: Partial<BookCreationDTO>): void {
    this.state.update(currentState => ({
      ...currentState,
      book: {
        ...currentState.book,
        ...updates
      }
    }));
  }


  setSubmitting(isSubmitting: boolean): void {
    this.state.update(currentState => ({
      ...currentState,
      isSubmitting
    }));
  }


  setError(error: string | null): void {
    this.state.update(currentState => ({
      ...currentState,
      error
    }));
  }


  reset(): void {
    this.state.set({
      book: BookFactory.createEmptyBook(),
      mode: 'create',
      isSubmitting: false,
      error: null
    });
  }
}
