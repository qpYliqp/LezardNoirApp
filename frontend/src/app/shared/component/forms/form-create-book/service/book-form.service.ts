import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {BookFormDTO} from '../model/BookFormDTO';
import {Book} from '../../../../models/Book';
import {apiURL} from '../../../../../../contants';
import {TitlesOverviewService} from '../../../../../features/titles-overview/service/titles-overview.service';


@Injectable()
export class BookFormService {
  private readonly http = inject(HttpClient);
  private readonly titlesService = inject(TitlesOverviewService);
  private readonly apiUrl = `${apiURL}book`;


  createBook(book: BookFormDTO): Observable<Book> {
    const formData = this.buildFormData(book);

    return this.http.post<Book>(this.apiUrl, formData).pipe(
      tap(createdBook => {
        console.log('Book created successfully:', createdBook);
        this.titlesService.addBook(createdBook);
      }),
      catchError(this.handleError)
    );
  }


  updateBook(bookId: number, book: BookFormDTO): Observable<Book> {

    const formData = this.buildFormData(book);
    return this.http.put<Book>(`${this.apiUrl}/${bookId}`, formData).pipe(
      tap(updatedBook => {
        console.log('Book updated successfully:', updatedBook);
        this.titlesService.updateBook(updatedBook);
      }),
      catchError(this.handleError)
    );
  }


  private buildFormData(book: BookFormDTO): FormData {
    const formData = new FormData();

    const bookDataForJson = {
      ...book,
      releaseDate: book.releaseDate ? book.releaseDate : null,
      authors: book.authors.map(author => author.id),
      bookSteps: book.bookSteps.map(step => ({
        id: step.id,
        productionStepId: step.productionStep.id,
        statusId: step.status.id,
        endDate: step.endDate ? step.endDate : null
      }))
    };


    console.log(bookDataForJson)

    // On retire le fichier de l'objet JSON pour ne pas l'envoyer en doublon ou faire planter le JSON
    // (Suppose que ton interface BookFormDTO a un champ 'coverFile' optionnel)
    const {coverFile, ...bookDataClean} = bookDataForJson as any;

    // 2. CRUCIAL : On stringify l'objet JSON et on l'ajoute comme champ texte 'book'
    // C'est ce que le C# va récupérer dans la variable string 'book'
    formData.append('book', JSON.stringify(bookDataClean));

    // 3. Ajout du fichier binaire s'il existe
    if (book.coverFile) {
      formData.append('coverFile', book.coverFile, book.coverFile.name);
    }

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
