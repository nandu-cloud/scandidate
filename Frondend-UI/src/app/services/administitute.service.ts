import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministituteService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // add user
  createUser(createUser,id, userId): Observable<any> {
      var create: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'phoneNumber': number,'institutionId':string, 'onboardedById':string, 'status': boolean} =
       { 'firstName': createUser.firstName,
          'lastName': createUser.lastName,
          'role': 'INSTITUTION',
          'subRole': 'OPERATIONAL_USER',
          'email': createUser.email,
          'phoneNumber': createUser.phoneNumber,
          'institutionId': id,
          'onboardedById': userId,
          'status': true
       };

      return this.http.post(this.baseUrl + '/api/institute/addUser', create,
       {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      );
  }

  // get Opps users list
  getUser(institutionId): Observable<any>{
    return this.http.get(this.baseUrl + '/api/institute/addUser/'+ institutionId);
  }

  // edit user
  getUserById(userId): Observable<any>{
    return this.http.get(this.baseUrl + '/api/institute/addUser/oppsUser/'+ userId);
  }

  //Update
  updateUser(updateUser, id, userId): Observable<any>{
     var create: {'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'phoneNumber': number,'institutionId':string, '_id':string, 'status': boolean}=
     {
      'firstName': updateUser.firstName,
      'lastName': updateUser.lastName,
      'role': 'INSTITUTION',
      'subRole': 'OPERATIONAL_USER',
      'email': updateUser.email,
      'phoneNumber': updateUser.phoneNumber,
      'institutionId': localStorage.getItem('instutuinId'),
      '_id': localStorage.getItem('_id'),
      'status': updateUser.status
     };
     return this.http.put(this.baseUrl + '/api/institute/addUser/oppsUser/'+ id, create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
     )
  }
}


