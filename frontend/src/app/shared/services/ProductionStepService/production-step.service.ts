import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Author} from '../../models/Author';
import {Observable} from 'rxjs';
import { apiURL } from '../../../../contants';

@Injectable()
export class ProductionStepService {


  private readonly apiUrl = `${apiURL}production-step`;

  constructor(private http: HttpClient) {
  }

  getAllAuthors(): Observable<Author[]> {

    return this.http.get<Author[]>(this.apiUrl);

  }


}
