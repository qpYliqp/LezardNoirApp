import {Injectable, signal} from '@angular/core';
import {apiURL} from '../../../../contants';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, of} from 'rxjs';
import { Book } from '../../../shared/models/Book';

@Injectable()
export class BookViewService {

  error = signal(false);
  private readonly apiUrl = `${apiURL}books`;
  private book_ = signal<Book | null>(null);
  readonly book = this.book_.asReadonly();

  constructor(private http: HttpClient) {
  }

  loadBookById(bookId: string): void {
    const params = new HttpParams().set('bookId', bookId);

    this.http.get<Book>(`${this.apiUrl}` + "/id", {params}).pipe(
      catchError(err => {
        console.error('Erreur lors du chargement du livre :', err.message);
        this.error.set(true);
        return of(null);
      })
    ).subscribe(book => {
      if (book) {
        this.book_.set(book);
      }
    });
  }
}
