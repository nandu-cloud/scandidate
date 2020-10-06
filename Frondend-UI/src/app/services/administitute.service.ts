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
  createUser(createUser,id): Observable<any> {
      var create: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'phoneNumber': number,'institutionId':string, 'status': boolean} =
       { 'firstName': createUser.firstName,
          'lastName': createUser.lastName,
          'role': 'INSTITUTION',
          'subRole': 'OPERATIONAL_USER',
          'email': createUser.email,
          'phoneNumber': createUser.phoneNumber,
          'institutionId': id,
          'status': createUser.status
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
}


