import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { from, Subscription, throwError } from 'rxjs';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class BgvSearchService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient,private route:ActivatedRoute) { 
    
 }

 //Get bgv list
 public getAllBGVData(searchParams) : Observable<any>{
  var userId = window.sessionStorage.getItem('ID');
  var searchData: { 'firstName':string,'dateOfBirth': string, 'phoneNumber': string ,'email': string ,'adharNumber':string} =
                  { 'firstName':searchParams.firstName ==""? undefined : searchParams.firstName,
                    'dateOfBirth': searchParams.dateOfBirth == ""? undefined : searchParams.dateOfBirth,
                    'phoneNumber': searchParams.phoneNumber == ""? undefined : searchParams.phoneNumber,
                    'email':searchParams.email == ""?undefined : searchParams.email,
                    'adharNumber':searchParams.adharNumber == ""?undefined : searchParams.adharNumber
                  };       
                  
                  
   //Object.keys(searchData).map(k => searchData[k] = searchData[k].trim());
  console.log(searchData); 
  return this.http.post(this.baseUrl + '/api/scandidate/bgvsearch/'+ userId, searchData
  // return this.http.post(`${this.baseUrl}/api/scandidate/bgvsearch/${userId}/${searchData}`)
  );
  }

//view details
public ViewCandidate(viewData) : Observable<any> {
  var id = window.sessionStorage.getItem('ID');
  // return this.http.get(this.baseUrl + '/api/scandidate/bgvsearch/'+viewData);
  return this.http.get(`${this.baseUrl}/api/scandidate/bgvsearch/${viewData}/${id}`);
}

public ViewLogo(org,inst) : Observable<any> {
  var logo :{
    "organisationId":[string],
    "instituteId":[string]
  } = 
  {
    'organisationId':org,
    "instituteId":inst
  }

  return this.http.post(this.baseUrl + '/api/scandidate/bgvsearch/icon/show',logo );
}

public download_PDF(data,data1) : Observable<any> {
  console.log("hello");
  console.log(data);
  console.log(data1);
  var pdf_data :{
    "data":[any],
    "data1":[any]
  } =
  {
    "data":data,
    "data1":data1
  }
  return this.http.post(this.baseUrl + '/api/scandidate/bgvsearch/searched-candidate/download',pdf_data);
}

}

