import {Author} from './Author';

export class Book {
  id!: number;
  title!: string;
  isbn!: string;
  nuart!: string;
  pages!: number;
  price!: number;
  coverUrl: string | null = null;
  authors: Author[] | null = null;
  releaseDate: Date | null = null;

  constructor(data: Partial<Book> = {}) {
    Object.assign(this, data);
  }
}
