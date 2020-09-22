import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  checkUserLogin(loginData): Observable<any> {
    var login: { 'email': string, 'password': string } = { 'email': loginData.email, 'password': loginData.password };
    return this.http.post(this.baseUrl + '/api/auth', login
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
 
}
