import {Author} from '../../../../models/Author';

export class BookCreationDTO {
  title: string | null = null;
  isbn: string | null = null;
  price: number | null = null;
  pages: number | null = null;
  nuart: string | null = null;
  releaseDate: Date | null = null;
  summary: string | null = null;
  hook: string | null = null;
  marketing: string | null = null;
  note: string | null = null;
  coverFile: File | null = null;
  date: Date | null = null;
  authors: Author[] | null = null;
}
