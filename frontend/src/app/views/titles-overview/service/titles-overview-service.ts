import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, finalize, map, of} from 'rxjs';
import {Book} from '../../../models/Book';
import {apiURL} from '../../../../contants';
import {BookFilter} from '../BookFilter';

@Injectable()
export class TitlesOverviewService {

  private allBooksSignal = signal<Book[]>([]);
  readonly allBooks = this.allBooksSignal.asReadonly();

  private booksGroupedSignal = signal<Map<string, Book[]>>(new Map());
  readonly booksGrouped = this.booksGroupedSignal.asReadonly();

  private loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly apiUrl = `${apiURL}books`;

  constructor(private http: HttpClient) {
    this.loadBooksByLetter();
  }

  loadAllBooks(filters?: BookFilter): void {
    const filteredFilters = Object.fromEntries(
      Object.entries(filters || {}).filter(([_, v]) => v != null)
    );

    const params = new HttpParams({fromObject: filteredFilters as any});

    this.loadingSignal.set(true);

    this.http.get<Book[]>(this.apiUrl, {params}).pipe(
      map(books => books.map(b => new Book(b))),
      catchError(err => {
        console.error('Erreur lors du chargement des livres :', err.message);
        return of([]);
      }),
      finalize(() => {
        this.loadingSignal.set(false);
      })
    ).subscribe(books => this.allBooksSignal.set(books));
  }

  loadBooksByLetter(): void {
    this.loadingSignal.set(true);

    this.http.get<Record<string, any[]>>(`${this.apiUrl}/letter`).pipe(
      map(response => {
        const result = new Map<string, Book[]>();
        Object.entries(response).forEach(([letter, books]) => {

          result.set(letter, books.map(b => new Book(b)));
        });
        console.log(result)
        return result;
      }),
      catchError(err => {
        console.error('Erreur lors du chargement des livres groupés :', err.message);
        return of(new Map<string, Book[]>());
      }),
      finalize(() => {
        this.loadingSignal.set(false);
      })
    ).subscribe(mapResult => this.booksGroupedSignal.set(mapResult));
  }

  addBook(book: Book): void {
    if (!book || !book.title) return;

    this.addToAllBook(book);
    this.addToBookGroupedByLetter(book);
  }

  private addToAllBook(book: Book): void {
    const updatedList = [...this.allBooksSignal(), book];
    this.allBooksSignal.set(updatedList);
  }

  private addToBookGroupedByLetter(book: Book): void {
    const firstLetter = book.title.charAt(0).toUpperCase();
    const currentGroups = this.booksGroupedSignal();
    const updatedGroups = new Map(currentGroups);

    const listForLetter = updatedGroups.get(firstLetter) || [];
    updatedGroups.set(firstLetter, [...listForLetter, book]);

    const sortedGroups = new Map(
      Array.from(updatedGroups.entries()).sort(([a], [b]) => a.localeCompare(b))
    );

    this.booksGroupedSignal.set(sortedGroups);
  }

}
