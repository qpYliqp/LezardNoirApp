export class Book {
  id!: number;
  title!: string;
  isbn!: string;
  nuart!: string;
  pages!: number;
  price!: number;
  coverUrl: string | null = null;

  constructor(data: Partial<Book> = {}) {
    Object.assign(this, data);
  }
}
