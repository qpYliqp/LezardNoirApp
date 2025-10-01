import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, of} from 'rxjs';
import {Book} from '../../../models/Book';
import {apiURL} from '../../../../contants';

@Injectable()
export class TitlesOverviewService {
  private booksGroupedByLetter = signal<Map<string, Book[]>>(new Map());

  readonly booksGrouped = this.booksGroupedByLetter.asReadonly();
  private apiUrl = apiURL + "books";

  constructor(private http: HttpClient) {
    this.loadBooks()
  }

  public addAllBookGroupedByLetter(book: Book) {
    if (!book || !book.title) {
      return;
    }

    const firstLetter = book.title.charAt(0).toUpperCase();
    const currentBooks = this.booksGroupedByLetter();
    const updatedBooks = new Map(currentBooks);
    const booksForLetter = updatedBooks.get(firstLetter) || [];
    booksForLetter.push(book);
    updatedBooks.set(firstLetter, booksForLetter);
    this.booksGroupedByLetter.set(updatedBooks);
  }


  private loadBooks(): void {
    this.http.get<{ [key: string]: any[] }>(`${this.apiUrl}/letter`).pipe(
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
    ).subscribe(booksMap => {
      this.booksGroupedByLetter.set(booksMap);
    });
  }

}
