import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { from, Subscription, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient,private route:ActivatedRoute) { 
    
  }

  public gettotalCount() : Observable<any> {
    return this.http.get(this.baseUrl + '/api/scandidate/dashboard/count');
  }
  

  public getinstituteCount() : Observable<any> {
    var instituteId = window.sessionStorage.getItem('InistutionId');
    var id = window.sessionStorage.getItem('ID');
    console.log(id);
    return this.http.get(`${this.baseUrl}/api/institute/dashboard/count/${instituteId}/${id}`);
  }

  public getorganizationCount() : Observable<any> {
    var organisationId = window.sessionStorage.getItem('organizationId');
    var id = window.sessionStorage.getItem('ID');
    console.log(id);
    return this.http.get(`${this.baseUrl}/api/organisation/dashboard/count/${organisationId}/${id}`);
  }

  public getHrpartnerCount() : Observable<any> {
    var organisationId = window.sessionStorage.getItem('hrorganisationId');
    var id = window.sessionStorage.getItem('ID');
    console.log(id);
    return this.http.get(`${this.baseUrl}/api/organisation/dashboard/count/${organisationId}/${id}`);
  }

  organizationGraph(updateOrgData) : Observable<any>{
  
    return this.http.put(this.baseUrl + '/api/scandidate/dashboard/orgonboardtrend', updateOrgData,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  inistutionGraph(updateInsData) : Observable<any>{
  
    return this.http.put(this.baseUrl + '/api/scandidate/dashboard/instonboardtrend', updateInsData,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }
}
