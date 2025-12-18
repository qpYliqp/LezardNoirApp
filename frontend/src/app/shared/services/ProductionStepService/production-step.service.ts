import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Author} from '../../models/Author';
import {Observable} from 'rxjs';
import {apiURL} from '../../../../contants';
import {ProductionStep} from '../../models/ProductionStep';

@Injectable()
export class ProductionStepService {


  private readonly apiUrl = `${apiURL}productionstep`;

  constructor(private http: HttpClient) {
  }

  getAllProductionStep(): Observable<ProductionStep[]> {

    return this.http.get<Author[]>(this.apiUrl);

  }


}
