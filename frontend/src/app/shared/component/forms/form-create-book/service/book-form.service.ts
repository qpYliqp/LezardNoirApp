import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {BookCreationDTO} from '../model/BookCreationDTO';
import {Book} from '../../../../models/Book';
import {apiURL} from '../../../../../../contants';
import {TitlesOverviewService} from '../../../../../features/titles-overview/service/titles-overview.service';


@Injectable()
export class BookFormService {
  private readonly http = inject(HttpClient);
  private readonly titlesService = inject(TitlesOverviewService);
  private readonly apiUrl = `${apiURL}books`;


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


  updateBook(bookId: number, book: BookCreationDTO): Observable<Book> {

    const formData = this.buildFormData(book);
    return this.http.put<Book>(`${this.apiUrl}/${bookId}`, formData).pipe(
      tap(updatedBook => {
        console.log('Book updated successfully:', updatedBook);
        this.titlesService.updateBook(updatedBook);
      }),
      catchError(this.handleError)
    );
  }


  private buildFormData(book: BookCreationDTO): FormData {
    console.log("steps before transformation: ", book.bookSteps)
    const formData = new FormData();

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

    const bookBlob = new Blob([JSON.stringify(bookWithoutFile)], {
      type: 'application/json'
    });
    formData.append('book', bookBlob, 'book.json');

    if (coverFile) {
      formData.append('coverFile', coverFile, coverFile.name);
    }
    const blob = formData.get('book') as Blob;

    blob.text().then(text => {
      console.log("BOOK JSON :", JSON.parse(text));
    });

    return formData;
  }


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
