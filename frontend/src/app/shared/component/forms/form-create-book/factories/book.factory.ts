import {BookFormDTO} from '../model/BookFormDTO';
import {Injectable} from '@angular/core';
import {BookStepFormDTO} from '../form-book-steps/model/BookStepFormDTO';

@Injectable()
export class BookFactory {


  static createEmptyBook(): BookFormDTO {
    return {
      title: "null",
      isbn: "9782723488525",
      price: 55,
      pages: 55,
      nuart: "null",
      releaseDate: new Date(),
      summary: "null",
      hook: "null",
      marketing: "null",
      note: "null",
      coverFile: null,
      authors: [],
      bookSteps: []
    };
  }


  static createEmptyBookStep(): BookStepFormDTO {
    return {
      productionStep: {} as any,
      status: {} as any,
      endDate: null
    };
  }


  static createBookFromPartial(partial: Partial<BookFormDTO>): BookFormDTO {
    return {
      ...BookFactory.createEmptyBook(),
      ...partial
    };
  }


  static cloneBook(book: BookFormDTO): BookFormDTO {
    return {
      ...book,
      authors: book.authors ? [...book.authors] : [],
      bookSteps: book.bookSteps ? [...book.bookSteps] : []
    };
  }
}
