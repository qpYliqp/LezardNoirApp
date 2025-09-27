import {Injectable} from '@angular/core';
import {apiURL} from '../../../../../contants';
import {HttpClient} from '@angular/common/http';
import {BookCreationDTO} from '../model/BookCreationDTO';

@Injectable()
export class BookFormService {
  private apiUrl = apiURL + "books";

  constructor(private http: HttpClient) {
  }

  public createBook(book: BookCreationDTO) {
    console.log("Données envoyées:", book);
    console.log("URL:", this.apiUrl);

    this.http.post<BookCreationDTO>(this.apiUrl, book)
      .subscribe({
        next: (response) => {
          console.log('Livre créé:', response);
        },
        error: (error) => {
          console.error('Erreur:', error);
        }
      });
  }
}
