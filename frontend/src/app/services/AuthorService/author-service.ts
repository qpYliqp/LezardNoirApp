import {Injectable} from '@angular/core';
import {apiURL} from '../../../contants';
import {HttpClient} from '@angular/common/http';
import {Author} from '../../models/Author';
import {Observable} from 'rxjs';

@Injectable()
export class AuthorService {


  private readonly apiUrl = `${apiURL}authors`;

  constructor(private http: HttpClient) {
  }

  getAllAuthors(): Observable<Author[]> {

    return this.http.get<Author[]>(this.apiUrl);

  }


}
