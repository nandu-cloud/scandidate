import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { from, Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BgvSearchService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient,private route:ActivatedRoute) { 
    
 }

 public getUserData() : Observable<any> {
  return this.http.get('https://jsonplaceholder.typicode.com/users');
}
}

