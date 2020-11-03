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

 //Get bgv list
 public getAllBGVData(searchParams) : Observable<any>{
  var searchData: { 'firstName':string,'dateOfBirth': string, 'phoneNumber': string ,'email': string ,'adharNumber':string} =
                  { 'firstName':searchParams.firstName == ""? undefined : searchParams.firstName,'dateOfBirth': searchParams.dateOfBirth == ""? undefined : searchParams.dateOfBirth,'phoneNumber': searchParams.phoneNumber == ""? undefined : searchParams.phoneNumber,'email':searchParams.email == ""?undefined : searchParams.email,'adharNumber':searchParams.adharNumber == ""?undefined : searchParams.adharNumber};
  return this.http.post(this.baseUrl + '/api/scandidate/bgvsearch' ,searchData
  );
}
}

