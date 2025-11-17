import {BookStepFormDTO} from '../form-book-steps/model/BookStepFormDTO';
import {Author} from '../../../../models/Author';

export interface BookCreationDTO {
  title: string | null;
  isbn: string | null;
  price: number | null;
  pages: number | null;
  nuart: string | null;
  releaseDate: Date | null;
  summary: string | null;
  hook: string | null;
  marketing: string | null;
  note: string | null;
  coverFile: File | null;
  date: Date | null;
  authors: Author[];
  bookSteps: BookStepFormDTO[];
}
