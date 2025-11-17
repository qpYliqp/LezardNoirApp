import {Injectable} from '@angular/core';
import {apiURL} from '../../../../contants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Author} from '../../models/Author';
import {Status} from '../../models/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private readonly apiUrl = `${apiURL}status`;

  constructor(private http: HttpClient) {
  }

  getAllStatus(): Observable<Status[]> {

    return this.http.get<Author[]>(this.apiUrl);

  }


}
