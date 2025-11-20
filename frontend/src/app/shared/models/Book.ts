import {Author} from './Author';
import {BookStep} from './BookStep';

export class Book {
  id!: number;
  title!: string;
  isbn!: string;
  nuart!: string;
  pages!: number;
  price!: number;
  summary: string | null = null;
  hook: string | null = null;
  marketing: string | null = null;
  note: string | null = null;
  coverUrl: string | null = null;
  authors: Author[] | null = null;
  releaseDate: Date | null = null;
  bookSteps: BookStep[] | null = null;

  constructor(data: Partial<Book> = {}) {
    Object.assign(this, data);
  }
}
