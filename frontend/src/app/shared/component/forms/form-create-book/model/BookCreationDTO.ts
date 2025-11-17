import {Author} from '../../../../models/Author';
import {BookStepFormDTO} from '../form-book-steps/model/BookStepFormDTO';

export class BookCreationDTO {
  title: string | null = "null";
  isbn: string | null = "9788925283807";
  price: number | null = 55;
  pages: number | null = 55;
  nuart: string | null = "null";
  releaseDate: Date | null = new Date();
  summary: string | null = "null";
  hook: string | null = "null";
  marketing: string | null = "null";
  note: string | null = "null";
  coverFile: File | null = null;
  date: Date | null = new Date();
  authors: Author[] | null = null;
  bookSteps: BookStepFormDTO[] = [];
}
