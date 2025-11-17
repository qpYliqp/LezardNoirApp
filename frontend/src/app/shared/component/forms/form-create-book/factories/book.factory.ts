import {BookCreationDTO} from '../model/BookCreationDTO';
import {IBookStepForm} from '../form-book-steps/model/BookStepFormDTO';

export class BookFactory {

  static createEmptyBook(): BookCreationDTO {
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
      date: null,
      authors: [],
      bookSteps: []
    };
  }


  static createEmptyBookStep(): IBookStepForm {
    return {
      productionStep: {} as any,
      status: {} as any,
      endDate: null
    };
  }


  static createBookFromPartial(partial: Partial<BookCreationDTO>): BookCreationDTO {
    return {
      ...BookFactory.createEmptyBook(),
      ...partial
    };
  }


  static cloneBook(book: BookCreationDTO): BookCreationDTO {
    return {
      ...book,
      authors: book.authors ? [...book.authors] : [],
      bookSteps: book.bookSteps ? [...book.bookSteps] : []
    };
  }
}
