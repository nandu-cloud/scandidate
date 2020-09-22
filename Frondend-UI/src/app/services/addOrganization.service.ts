import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class addOrganizationService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  checkAddOrganization(addOrgData): Observable<any> {
    var orgData: { 'organizationName': string, 'contactPersonName': string ,'organisationAddress': string ,'organisationType': string, 'organisationEmail': string ,
                 'organisationEmployeeSize':number , 'organisationActiveFrom' : string , 'organisationZIP' : number, 'organisationDescription': string , 'status' : boolean} = 
                { 'organizationName': addOrgData.name, 'contactPersonName': addOrgData.cPesonName ,'organisationAddress': addOrgData.address, 'organisationType' : addOrgData.type,
                  'organisationEmail': addOrgData.email,'organisationEmployeeSize':addOrgData.size,'organisationActiveFrom':addOrgData.activeform,'organisationZIP':addOrgData.pCode,'organisationDescription': addOrgData.description,'status':true};
    return this.http.post(this.baseUrl + '/api/scandidate/organisation', orgData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }

  public getOrganizationData() : Observable<any> {
    return this.http.get(this.baseUrl + '/api/scandidate/organisation');
  }
 
}
