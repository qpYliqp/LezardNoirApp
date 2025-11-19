import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {BookCreationDTO} from '../model/BookCreationDTO';
import {Book} from '../../../../models/Book';
import {apiURL} from '../../../../../../contants';
import {TitlesOverviewService} from '../../../../../features/titles-overview/service/titles-overview.service';

/**
 * Service responsible for Book CRUD operations via API
 * Follows Angular best practices:
 * - Single Responsibility: Only handles API communication
 * - Dependency Injection: Uses inject() function
 * - Observable pattern: Returns Observables for reactive programming
 * - Error handling: Centralized error handling
 */
@Injectable()
export class BookFormApiService {
  private readonly http = inject(HttpClient);
  private readonly titlesService = inject(TitlesOverviewService);
  private readonly apiUrl = `${apiURL}books`;

  /**
   * Create a new book
   * @param book - Book data to create
   * @returns Observable<Book> - Created book from server
   */
  createBook(book: BookCreationDTO): Observable<Book> {
    const formData = this.buildFormData(book);

    return this.http.post<Book>(this.apiUrl, formData).pipe(
      tap(createdBook => {
        console.log('Book created successfully:', createdBook);
        this.titlesService.addBook(createdBook);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Update an existing book
   * @param bookId - ID of the book to update
   * @param book - Updated book data
   * @returns Observable<Book> - Updated book from server
   */
  updateBook(bookId: number, book: BookCreationDTO): Observable<Book> {

    const formData = this.buildFormData(book);
    console.log(`bbbbbb : ${formData}`);

    return this.http.put<Book>(`${this.apiUrl}/${bookId}`, formData).pipe(
      tap(updatedBook => {
        console.log('Book updated successfully:', updatedBook);
        this.titlesService.updateBook(updatedBook);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Build FormData for multipart request
   * @private
   */
  private buildFormData(book: BookCreationDTO): FormData {
    console.log("steps before transformation: ", book.bookSteps)
    const formData = new FormData();

    // Clone the book and transform dates to ISO strings
    const bookData = {
      ...book,
      releaseDate: book.releaseDate ? book.releaseDate : null,
      bookSteps: book.bookSteps.map(step => ({
        ...step,
        endDate: step.endDate ? step.endDate : null
      }))
    };

    const {coverFile, ...bookWithoutFile} = bookData;

    console.log("bookSteps after transformation:", bookWithoutFile.bookSteps);

    // Append book data as JSON
    const bookBlob = new Blob([JSON.stringify(bookWithoutFile)], {
      type: 'application/json'
    });
    formData.append('book', bookBlob, 'book.json');

    // Append cover file if present
    if (coverFile) {
      formData.append('coverFile', coverFile, coverFile.name);
    }
    const blob = formData.get('book') as Blob;

    blob.text().then(text => {
      console.log("BOOK JSON :", JSON.parse(text));
    });

    return formData;
  }

  /**
   * Centralized error handler
   * @private
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
    }

    console.error('BookFormApiService error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
