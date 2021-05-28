import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HrpartnerService {
  baseUrl = environment.baseUrl;
  hrIdupdate:number;
  hrIdedit: number;
  orgIdupdate:number;
  constructor(private http: HttpClient,private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.orgIdupdate = params.id;
   });
   }
  addHrPartner(addHrData): Observable<any> {
    var orgData: { 'hrorganizationname': string, 
                   'hrcontactPersonName': string ,
                   'hrorganisationAddress': string ,
                   'hrorganisationType': string,
                   'hrorganisationEmail': string ,
                   'hrorganisationEmployeeSize':string ,
                   'hrorganisationActiveFrom' : string ,
                   'hrorganisationZIP' : number,
                   'hrorganisationDescription': string ,
                   'status' : boolean ,
                   'contact' : number ,
                   'code': string ,
                   'hrorganisationLogo' : string,
                   'legalEntityName' : string,
                   'hrorganizationLocation':string,
                   'state':string,
                   'headQuaterLocation' :string,
                   'hrorganizationGstn':string,
                   'hrorganizationCin':string,
                   'panNumber':string,
                   'landMark': string
                  } =
                { 'hrorganizationname': addHrData.hrorganizationname,
                  'hrcontactPersonName': addHrData.hrcontactPersonName,
                  'hrorganisationAddress': addHrData.hrorganisationAddress,
                   'hrorganisationType' : addHrData.hrorganisationType,
                  'hrorganisationEmail': addHrData.hrorganisationEmail,
                  'hrorganisationEmployeeSize':addHrData.hrorganisationEmployeeSize,
                  'hrorganisationActiveFrom':addHrData.hrorganisationActiveFrom,
                  'hrorganisationZIP':addHrData.hrorganisationZIP,
                  'hrorganisationDescription': addHrData.hrorganisationDescription,
                  'status':true,
                  'contact':addHrData.contact,
                  'code':addHrData.code , 
                  'legalEntityName':addHrData.legalEntityName,
                  'hrorganizationLocation':addHrData.hrorganizationLocation,
                  'state':addHrData.state,
                   'headQuaterLocation': addHrData.headQuaterLocation,
                   'hrorganizationGstn':addHrData.hrorganizationGstn == ""? undefined :addHrData.hrorganizationGstn,
                   'hrorganizationCin':addHrData.hrorganizationCin == ""? undefined : addHrData.hrorganizationCin,
                  'panNumber':addHrData.panNumber == ""? undefined :addHrData.panNumber,
                  'hrorganisationLogo':addHrData.hrorganisationLogo == ""?undefined:addHrData.hrorganisationLogo,
                  'landMark': addHrData.landMark
                };
    return this.http.post(this.baseUrl + '/api/hrpartner/admin/', orgData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }

  public getHrPartnerData() : Observable<any> {
    return this.http.get(this.baseUrl + '/api/hrpartner/admin/');
  }
  editHrPartner(edithrData) : Observable<any> {
    return this.http.get(this.baseUrl + '/api/hrpartner/admin/' +edithrData );
  }

  updateHrPartner(updateOrgData, id) : Observable<any>{
    var orgData: { 'hrorganizationname': string, 
    'hrcontactPersonName': string ,
    'hrorganisationAddress': string ,
    'hrorganisationType': string,
    'hrorganisationEmail': string ,
    'hrorganisationEmployeeSize':string ,
    'hrorganisationActiveFrom' : string ,
    'hrorganisationZIP' : number,
    'hrorganisationDescription': string ,
    'status' : boolean ,
    'contact' : number ,
    'code': string ,
    'hrorganisationLogo' : string,
    'legalEntityName' : string,
    'hrorganizationLocation':string,
    'state':string,
    'headQuaterLocation' :string,
    'hrorganizationGstn':string,
    'hrorganizationCin':string,
    'panNumber':string,
    'landMark': string
  } =
   { 'hrorganizationname': updateOrgData.hrorganizationname,
   'hrcontactPersonName': updateOrgData.hrcontactPersonName,
   'hrorganisationAddress': updateOrgData.hrorganisationAddress,
    'hrorganisationType' : updateOrgData.hrorganisationType,
   'hrorganisationEmail': updateOrgData.hrorganisationEmail,
   'hrorganisationEmployeeSize':updateOrgData.hrorganisationEmployeeSize,
   'hrorganisationActiveFrom':updateOrgData.hrorganisationActiveFrom,
   'hrorganisationZIP':updateOrgData.hrorganisationZIP,
   'hrorganisationDescription': updateOrgData.hrorganisationDescription,
   'status':true,
   'contact':updateOrgData.contact,
   'code':updateOrgData.code , 
   'legalEntityName':updateOrgData.legalEntityName,
   'hrorganizationLocation':updateOrgData.hrorganizationLocation,
   'state':updateOrgData.state,
    'headQuaterLocation': updateOrgData.headQuaterLocation,
    'hrorganizationGstn':updateOrgData.hrorganizationGstn == ""? undefined :updateOrgData.hrorganizationGstn,
    'hrorganizationCin':updateOrgData.hrorganizationCin == ""? undefined : updateOrgData.hrorganizationCin,
   'panNumber':updateOrgData.panNumber == ""? undefined :updateOrgData.panNumber,
   'hrorganisationLogo':updateOrgData.hrorganisationLogo == ""?undefined:updateOrgData.hrorganisationLogo,
   'landMark': updateOrgData.landMark
    //  'orgIdupdate': id
    };
    return this.http.put(this.baseUrl + '/api/hrpartner/admin/' + id, orgData,
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
}
