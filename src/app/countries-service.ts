import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((countries) =>
        countries.map((country) => country.name.common)
      )
    );
  }
}
