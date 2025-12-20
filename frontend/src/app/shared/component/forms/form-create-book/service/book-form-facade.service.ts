import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {BookFormSignalStore} from '../store/book-form.store';
import {BookFormService} from './book-form.service';
import {BookFormDTO} from '../model/BookFormDTO';
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
  readonly error = this.store.error;
  private readonly apiService = inject(BookFormService);


  initializeForCreate(): void {
    this.store.initializeForCreate();
  }


  initializeForEdit(book: BookFormDTO): void {
    this.store.initializeForEdit(book);
  }


  updateBook(updates: Partial<BookFormDTO>): void {
    this.store.updateBook(updates);
  }


  submit(): Observable<Book> {
    const currentBook = this.store.book();

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


  reset(): void {
    this.store.reset();
  }
}
