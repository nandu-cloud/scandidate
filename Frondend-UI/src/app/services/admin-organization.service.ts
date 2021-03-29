import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminOrganizationService {
  stdIdupdate;
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.stdIdupdate = params.id;
  });
}

//Create user

createUser(createUser): Observable<any> {
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('organizationId');
    var create: { 'firstName': string,
         'lastName': string,
         'role': string,
         'subRole': string,
         'email': string,
         'phoneNumber': number,
         'organizationId':string,
         'status': boolean,
         'onboardedById' : string
        } =
     { 'firstName': createUser.firstName,
        'lastName': createUser.lastName,
        'role': 'ORGANIZATION',
        'subRole': createUser.subRole,
        'email': createUser.email,
        'phoneNumber': createUser.phoneNumber,
        'organizationId': organizationId,
        'onboardedById' : id,
        'status':true,
     };

    return this.http.post(this.baseUrl + '/api/organisation/admin', create,
     {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    );
}

//Get List Organization User

public getOrganizationUserList() : Observable<any> {
  var organizationId = window.sessionStorage.getItem('organizationId');
  return this.http.get(this.baseUrl + '/api/organisation/admin/' +organizationId);
}
//edit by ID

editOrganizationUser(editOrgUser) : Observable<any> {
  return this.http.get(this.baseUrl + '/api/organisation/admin/oppsUser/' +editOrgUser );
}
//update User

updateUser(updateUser): Observable<any> {
  var id = window.sessionStorage.getItem('ID');
  var organizationId = window.sessionStorage.getItem('organizationId');
  var update: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'phoneNumber': number,'organizationId':string, 'status': boolean, 'onboardedById' : string} =
   { 'firstName': updateUser.firstName,
      'lastName': updateUser.lastName,
      'role': 'ORGANIZATION',
      'subRole': updateUser.subRole,
      'email': updateUser.email,
      'phoneNumber': updateUser.phoneNumber,
      'organizationId': organizationId,
      'onboardedById' : id,
      'status':updateUser.status,
   };

  return this.http.put(this.baseUrl + '/api/organisation/admin/oppsUser/' +this.stdIdupdate, update,
   {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  );
}

public getLinemanagerData(): Observable<any> {
  return this.http.get(this.baseUrl + '/api/organisation/admin/show/lineManager');
}

// public assignLinemanager(id: number, redata): Observable<any> {
//   return this.http.post(this.baseUrl + '/api/organisation/operational/inprogress/saveNow/' + id, redata);
    // return this.http.get(`${this.baseUrl}/api/organisation/operational/downloadfile/${employeedocumentlink}`, { responseType: 'blob' });
    // } 
public assignLinemanager(empId, linemanagerId, redata): Observable<any> {
  // return this.http.post(`${this.baseUrl}/api/organisation/lineManager/savenow/assigneddata/${empId}/${linemanagerId}`);
     return this.http.post(`${this.baseUrl}/api/organisation/lineManager/savenow/assigneddata/${empId}/${linemanagerId}`, redata);
    // return this.http.post(this.baseUrl + '/api/organisation/lineManager/savenow/assigneddata/' + empId + '/' +linemanagerId);
}
}
