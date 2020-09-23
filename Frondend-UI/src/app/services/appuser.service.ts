import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppuserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Create Opps user
  createUserData(createUserData): Observable<any> {
    var create: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'dateOfBirth': string, 'status': boolean, 'phoneNumber': 'number'} =
    {
      'firstName': createUserData.firstName, 'lastName': createUserData.lastName, 'role':
      createUserData.role, 'subRole': createUserData.subRole, 'email': createUserData.email,
       'dateOfBirth': createUserData.dateOfBirth, 'status': createUserData.status,
       'phoneNumber': createUserData.phoneNumber
    };

    return this.http.post(this.baseUrl + '/api/scandidate/user', create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  // get Opps users list
  getUser(): Observable<any>{
    return this.http.get(this.baseUrl + '/api/scandidate/user');
  }
  getUserById(_userId): Observable<any>{
    return this.http.get(this.baseUrl + '/api/scandidate/user/'+_userId);
  }


  editUser(editUserData,userid): Observable<any> {
    // this.editUserData = this.('emailForEdit');
    var create: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'dateOfBirth': string, 'status': boolean, 'phoneNumber': 'number'} = 
    { 'firstName': editUserData.firstName, 'lastName': editUserData.lastName, 'role':
    editUserData.role, 'subRole': editUserData.subRole, 'email': editUserData.email,
     'dateOfBirth': editUserData.dateOfBirth, 'status': editUserData.status,
     'phoneNumber': editUserData.phoneNumber};
    return this.http.put(this.baseUrl + '/api/scandidate/user/'+userid, create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
