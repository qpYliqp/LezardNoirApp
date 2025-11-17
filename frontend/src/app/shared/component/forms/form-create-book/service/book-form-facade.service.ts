import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {BookFormSignalStore} from '../store/book-form.store';
import {BookFormApiService} from './book-form-api.service';
import {BookCreationDTO} from '../model/BookCreationDTO';
import {Book} from '../../../../models/Book';

/**
 * Facade service that orchestrates the book form operations
 * Follows the Facade pattern to provide a simplified interface
 * Coordinates between the store and API service
 */
@Injectable()
export class BookFormFacadeService {
  private readonly store = inject(BookFormSignalStore);
  // Expose store signals for components to consume
  readonly book = this.store.book;
  readonly mode = this.store.mode;
  readonly isSubmitting = this.store.isSubmitting;
  readonly error = this.store.error;
  readonly isEditMode = this.store.isEditMode;
  readonly isCreateMode = this.store.isCreateMode;
  private readonly apiService = inject(BookFormApiService);

  /**
   * Initialize form for creating a new book
   */
  initializeForCreate(): void {
    this.store.initializeForCreate();
  }

  /**
   * Initialize form for editing an existing book
   */
  initializeForEdit(book: BookCreationDTO): void {
    this.store.initializeForEdit(book);
  }

  /**
   * Update book data in the store
   */
  updateBook(updates: Partial<BookCreationDTO>): void {
    this.store.updateBook(updates);
  }

  /**
   * Submit the form (create or update based on mode)
   * @returns Observable<Book> - The created or updated book
   */
  submit(): Observable<Book> {
    const currentBook = this.store.book();
    console.log("Book in facade submit:", currentBook);
    console.log("BookSteps in facade submit:", currentBook.bookSteps);
    this.store.setSubmitting(true);
    this.store.setError(null);

    const request$ = this.store.isEditMode()
      ? this.apiService.updateBook(currentBook.id!, currentBook)
      : this.apiService.createBook(currentBook);

    return request$.pipe(
      tap({
        next: () => {
          console.log(`Book ${this.store.mode()} successful`);
        },
        error: (error) => {
          this.store.setError(error.message);
          console.error(`Book ${this.store.mode()} failed:`, error);
        }
      }),
      finalize(() => {
        this.store.setSubmitting(false);
      })
    );
  }

  /**
   * Reset the form to initial state
   */
  reset(): void {
    this.store.reset();
  }
}
