import {computed, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, finalize, map, of} from 'rxjs';
import {apiURL} from '../../../../contants';
import {BookFilter} from '../BookFilter';
import {Book} from '../../../shared/models/Book';

@Injectable()
export class TitlesOverviewService {
  readonly booksGrouped = computed<Map<string, Book[]>>(() => {
    const groups = new Map<string, Book[]>();
    for (const book of this.allBooks()) {
      const key = firstLetterKey(book.title);
      const current = groups.get(key) ?? [];
      groups.set(key, [...current, book]);
    }
    return new Map(
      Array.from(groups.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([letter, list]) => [
          letter,
          [...list].sort((x, y) => x.title.localeCompare(y.title)),
        ])
    );
  });
  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();
  private readonly apiUrl = `${apiURL}books`;
  private readonly allBooksSignal = signal<Book[]>([]);
  readonly allBooks = this.allBooksSignal.asReadonly();

  constructor(private readonly http: HttpClient) {
  }

  loadAllBooks(filters?: BookFilter): void {
    const filtered = Object.fromEntries(
      Object.entries(filters ?? {}).filter(([, v]) => v !== null && v !== undefined && v !== '')
    );
    const params = new HttpParams({fromObject: filtered as Record<string, string>});

    this.loadingSignal.set(true);

    this.http.get<Book[]>(this.apiUrl, {params}).pipe(
      map(arr => arr.map(b => new Book(b))),
      map(books => books.sort((a, b) => a.title.localeCompare(b.title))),
      catchError(err => {
        console.error('Erreur lors du chargement des livres :', err?.message ?? err);
        return of([] as Book[]);
      }),
      finalize(() => this.loadingSignal.set(false)),
    ).subscribe(books => this.allBooksSignal.set(books));
  }

  addBook(book: Book): void {
    if (!book || !book.title?.trim()) return;
    const exists = this.allBooks().some(b => equalsId(b, book));
    const next = exists
      ? this.allBooks().map(b => (equalsId(b, book) ? book : b))
      : [...this.allBooks(), book];
    next.sort((a, b) => a.title.localeCompare(b.title));
    this.allBooksSignal.set(next);
  }

  updateBook(book: Book): void {
    if (!book || !book.title?.trim()) return;
    const next = this.allBooks().map(b => (equalsId(b, book) ? book : b));
    next.sort((a, b) => a.title.localeCompare(b.title));
    this.allBooksSignal.set(next);
  }
}

function firstLetterKey(raw: string | undefined | null): string {
  const title = (raw ?? '').trim();
  if (!title) return '#';
  const normalized = title.normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase();
  const first = normalized.charAt(0);
  return /[A-Z]/.test(first) ? first : '#';
}

function equalsId(a: Book, b: Book): boolean {
  return (a as any).id != null && (a as any).id === (b as any).id;
}
