import {Injectable} from '@angular/core';
import {apiURL} from '../../../../../contants';
import {HttpClient} from '@angular/common/http';
import {BookCreationDTO} from '../model/BookCreationDTO';

@Injectable()
export class BookFormService {

  private apiUrl = apiURL + "books";

  constructor(private http: HttpClient) {
  }

  public updateBook(book: BookCreationDTO) {
    console.log("calling api", this.apiUrl)
    return this.http.post(this.apiUrl, book);
  }

}
