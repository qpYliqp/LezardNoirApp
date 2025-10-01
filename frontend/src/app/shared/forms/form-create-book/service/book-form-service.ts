import {inject, Injectable} from '@angular/core';
import {apiURL} from '../../../../../contants';
import {HttpClient} from '@angular/common/http';
import {BookCreationDTO} from '../model/BookCreationDTO';
import {TitlesOverviewService} from '../../../../views/titles-overview/service/titles-overview-service';
import {Book} from '../../../../models/Book';

@Injectable()
export class BookFormService {
  titlesService = inject(TitlesOverviewService);
  private apiUrl = apiURL + "books";

  constructor(private http: HttpClient) {
  }

  public createBook(book: BookCreationDTO) {
    const formData = new FormData();

    formData.append('title', book.title ?? '');
    formData.append('isbn', book.isbn ?? '');
    formData.append('price', book.price?.toString() ?? '0');
    formData.append('pages', book.pages?.toString() ?? '0');
    formData.append('nuart', book.nuart ?? '');
    formData.append('date', book.date?.toISOString() ?? '');
    formData.append('summary', book.summary ?? '');
    formData.append('hook', book.hook ?? '');
    formData.append('marketing', book.marketing ?? '');
    formData.append('note', book.note ?? '');

    if (book.coverFile) {
      formData.append('coverFile', book.coverFile, book.coverFile.name);
    }

    console.log("Données envoyées via FormData:", formData);

    this.http.post<Book>(this.apiUrl, formData)
      .subscribe({
        next: (response) => {
          this.titlesService.addAllBookGroupedByLetter(response)
        },
        error: (error) => console.error('Erreur:', error)
      });
  }
}
