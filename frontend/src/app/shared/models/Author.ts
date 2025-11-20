export class Author {
  id!: number;
  name!: string;

  constructor(data: Partial<Author> = {}) {
    Object.assign(this, data);
  }
}
