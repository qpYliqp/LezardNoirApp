import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookCreationDTO} from '../model/BookCreationDTO';
import {Book} from '../../../../models/Book';
import {apiURL} from '../../../../../../contants';
import {TitlesOverviewService} from '../../../../../features/titles-overview/service/titles-overview.service';

@Injectable()
export class BookFormService {
  titlesService = inject(TitlesOverviewService);
  private apiUrl = apiURL + "books";

  constructor(private http: HttpClient) {
  }

  public createBook(book: BookCreationDTO) {
    const formData = new FormData();

    const bookData = Object.assign({}, book);
    bookData.bookSteps = [...book.bookSteps];


    console.log("book parameter : ", book, "data : ", bookData)

    const {coverFile, ...bookWithoutFile} = bookData;

    const bookBlob = new Blob([JSON.stringify(bookWithoutFile)], {
      type: 'application/json'
    });
    formData.append('book', bookBlob, 'book.json');

    if (book.coverFile) {
      formData.append('coverFile', book.coverFile, book.coverFile.name);
    }

    bookBlob.text().then(t => console.log(t));


    this.http.post<Book>(this.apiUrl, formData)
      .subscribe({
        next: (response) => {
          console.log('Book created successfully:', response);
          this.titlesService.addBook(response);
        },
        error: (error) => {
          console.error('Error creating book:', error);
          if (error.error) {
            console.error('Server error details:', error.error);
          }
        }
      });
  }
}
