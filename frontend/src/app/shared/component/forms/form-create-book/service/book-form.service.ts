import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookCreationDTO} from '../model/BookCreationDTO';
import {Book} from '../../../../models/Book';
import { apiURL } from '../../../../../../contants';
import { TitlesOverviewService } from '../../../../../features/titles-overview/service/titles-overview.service';

@Injectable()
export class BookFormService {
  titlesService = inject(TitlesOverviewService);
  private apiUrl = apiURL + "books";

  constructor(private http: HttpClient) {
  }

  public createBook(book: BookCreationDTO) {
    const formData = new FormData();

    const bookBlob = new Blob([JSON.stringify(book)], {
      type: 'application/json'
    });
    formData.append('book', bookBlob, 'book.json');


    if (book.coverFile) {
      formData.append('coverFile', book.coverFile, book.coverFile.name);
    }

    console.log("Données envoyées via FormData:", formData);

    this.http.post<Book>(this.apiUrl, formData)
      .subscribe({
        next: (response) => {
          this.titlesService.addBook(response)
        },
        error: (error) => console.error('Erreur:', error)
      });
  }
}
