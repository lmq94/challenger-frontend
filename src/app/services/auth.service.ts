import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://challenger-u6b0.onrender.com/users/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    const loginData = { email, password };
    return this.http.post(this.apiUrl, { email, password }, { responseType: 'text' });

  }
}
