import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import {Book} from '../../../models/Book';
import {apiURL} from '../../../../contants';

@Injectable()
export class TitlesOverviewService {
  private loadedBooks = new Map<string, Book[]>();
  private apiUrl = apiURL + "books";

  constructor(private http: HttpClient) {}

  getAllBooksGroupedByLetter(): Observable<Map<string, Book[]>> {
    return this.http.get<{ [key: string]: Book[] }>(`${this.apiUrl}/letter`).pipe(
      tap(response => {
        // on remplit le Map pour pouvoir accéder rapidement aux lettres
        Object.entries(response).forEach(([letter, books]) => {
          this.loadedBooks.set(letter, books);
        });
      }),
      map(response => new Map(Object.entries(response))), // transforme l'objet en Map
      catchError(err => {
        console.error('Erreur lors du chargement des livres groupés par lettre:', err.message);
        return of(new Map());
      })
    );
  }

}
