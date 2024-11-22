import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardData } from '../interfaces/card-data';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getCardsUp(): Observable<CardData[]> {
    return this.http.get<any>(this.apiUrl).pipe(map(data => data.cardsUp));
  }

  getCardsDown(): Observable<CardData[]> {
    return this.http.get<any>(this.apiUrl).pipe(map(data => data.cardsDown));
  }


}
