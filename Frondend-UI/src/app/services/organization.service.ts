import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class addOrganizationService {
  baseUrl = environment.baseUrl;
  orgIdedit: number;
  orgIdupdate:number;
  constructor(private http: HttpClient,private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.orgIdupdate = params.id;
});
   }

  checkAddOrganization(addOrgData): Observable<any> {
    var orgData: { 'organizationName': string, 
                   'contactPersonName': string ,
                   'organisationAddress': string ,
                   'organisationType': string,
                   'organisationEmail': string ,
                   'organisationEmployeeSize':string ,
                   'organisationActiveFrom' : string ,
                   'organisationZIP' : number,
                   'organisationDescription': string ,
                   'status' : boolean ,
                   'contact' : number ,
                   'code': string ,
                   'organisationLogo' : string,
                   'legalEntityName' : string,
                   'organizationLocation':string,
                   'state':string,
                   'headQuaterLocation' :string,
                   'organizationGstn':string,
                   'organizationCin':string,
                   'panNumber':string,
                   'landMark': string
                  } =
                { 'organizationName': addOrgData.organizationName,
                  'contactPersonName': addOrgData.contactPersonName,
                  'organisationAddress': addOrgData.organisationAddress,
                   'organisationType' : addOrgData.organisationType,
                  'organisationEmail': addOrgData.organisationEmail,
                  'organisationEmployeeSize':addOrgData.organisationEmployeeSize,
                  'organisationActiveFrom':addOrgData.organisationActiveFrom,
                  'organisationZIP':addOrgData.organisationZIP,
                  'organisationDescription': addOrgData.organisationDescription,
                  'status':true,
                  'contact':addOrgData.contact,
                  'code':addOrgData.code , 
                  'legalEntityName':addOrgData.legalEntityName,
                  'organizationLocation':addOrgData.organizationLocation,
                  'state':addOrgData.state,
                   'headQuaterLocation': addOrgData.headQuaterLocation,
                   'organizationGstn':addOrgData.organizationGstn == ""? undefined :addOrgData.organizationGstn,
                   'organizationCin':addOrgData.organizationCin == ""? undefined : addOrgData.organizationCin,
                  'panNumber':addOrgData.panNumber == ""? undefined :addOrgData.panNumber,
                  'organisationLogo':addOrgData.organisationLogo == ""?undefined:addOrgData.organisationLogo,
                  'landMark': addOrgData.landMark
                };
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

  editOrganization(editOrgData) : Observable<any> {
    return this.http.get(this.baseUrl + '/api/scandidate/organisation/' +editOrgData );
  }

  updateOrganization(updateOrgData) : Observable<any>{
    var orgData: { 'organizationName': string,
     'contactPersonName': string ,
     'organisationAddress': string ,
     'organisationType': string,
      'organisationEmail': string ,
    'organisationEmployeeSize':string , 
    'organisationActiveFrom' : string ,
     'organisationZIP' : number,
      'organisationDescription': string ,
       'status' : boolean ,
        'contact' : number ,
         'code': string ,
          'organisationLogo': string,
    'legalEntityName' : string,
    'organizationLocation':string,
    'state':string,
    'headQuaterLocation' :string,
    'organizationGstn':string,
    'organizationCin':string,
    'panNumber':string,
    'landMark':string
  } =
   { 'organizationName': updateOrgData.organizationName,
    'contactPersonName': updateOrgData.contactPersonName ,
    'organisationAddress': updateOrgData.organisationAddress,
     'organisationType' : updateOrgData.organisationType,
     'organisationEmail': updateOrgData.organisationEmail,
     'organisationEmployeeSize':updateOrgData.organisationEmployeeSize,
     'organisationActiveFrom':updateOrgData.organisationActiveFrom,
     'organisationZIP':updateOrgData.organisationZIP,
     'organisationDescription': updateOrgData.organisationDescription,
     'status':updateOrgData.status,
     'contact':updateOrgData.contact,
     'code':updateOrgData.code , 
     'legalEntityName':updateOrgData.legalEntityName,
     'organizationLocation':updateOrgData.organizationLocation,
     'state':updateOrgData.state,
      'headQuaterLocation': updateOrgData.headQuaterLocation,
      'organizationGstn':updateOrgData.organizationGstn == ""? undefined :updateOrgData.organizationGstn,
      'organizationCin':updateOrgData.organizationCin == ""? undefined : updateOrgData.organizationCin,
     'panNumber':updateOrgData.panNumber == ""? undefined :updateOrgData.panNumber,
     'organisationLogo':updateOrgData.organisationLogo == ""?undefined:updateOrgData.organisationLogo,
     'landMark':updateOrgData.landMark
    };
    return this.http.put(this.baseUrl + '/api/scandidate/organisation/' +this.orgIdupdate, orgData,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  //post Image
  postFile(fileToUpload: File) :Observable<any>{
    const formData: FormData = new FormData();
    formData.append('logo', fileToUpload);
   return this.http.post(this.baseUrl + '/api/scandidate/organisation/uploadlogo', formData

   );
  }
  deleteFile(fileDelete: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/scandidate/organisation/deletelogo/'+fileDelete);
  }

  //Get Employee list
  public getAllEmployeeData(searchParams) : Observable<any>{
    var searchData: { 'firstName':string,'email': string, 'phoneNumber': string,'organizationName':string } =
                    { 'firstName':searchParams.firstName == ""? undefined : searchParams.firstName,'email': searchParams.email == ""?undefined : searchParams.email,'phoneNumber': searchParams.phoneNumber == ""? undefined : searchParams.phoneNumber,'organizationName': searchParams.organizationName == ""? undefined : searchParams.organizationName};
    return this.http.post(this.baseUrl + '/api/scandidate/organisation/search/employee' ,searchData
    );
  }
}
