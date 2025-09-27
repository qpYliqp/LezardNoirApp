import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Book} from '../../../models/Book';
import {apiURL} from '../../../../contants';

@Injectable()
export class TitlesOverviewService {
  private loadedBooks = new Map<string, Book[]>();
  private apiUrl = apiURL + "books";

  constructor(private http: HttpClient) {
  }

  getAllBooksGroupedByLetter(): Observable<Map<string, Book[]>> {
    return this.http.get<{ [key: string]: any[] }>(`${this.apiUrl}/letter`).pipe(
      map(response => {
        const result = new Map<string, Book[]>();
        Object.entries(response).forEach(([letter, books]) => {
          result.set(letter, books.map(b => new Book(b)));
        });
        return result;
      }),
      catchError(err => {
        console.error('Erreur lors du chargement des livres groupés par lettre:', err.message);
        return of(new Map());
      })
    );
  }

  updateAllBookGroupedByLetter(book: Book) {

  }

}
