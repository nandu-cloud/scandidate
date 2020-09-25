import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppuserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Create Opps user
  createUserData(createUserData): Observable<any> {
    var create: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'dateOfBirth': string, 'status': boolean, 'phoneNumber': 'number',
   'organizationId': string, 'institutionId': string, 'employeeId': string, 'currentAddress': string, 'permanentAddress': string, 'aboutMe': string,
    'noOfAssociatedUsers': number, 'avatarLink': string
  } =
    {
      'firstName': createUserData.firstName, 'lastName': createUserData.lastName, 'role':
      createUserData.role, 'subRole': createUserData.subRole, 'email': createUserData.email,
       'dateOfBirth': createUserData.dateOfBirth, 'status': createUserData.status,
       'phoneNumber': createUserData.phoneNumber,
       'organizationId': createUserData.organizationId,
       'institutionId': createUserData.institutionId, 'employeeId': createUserData.employeeId,
       'currentAddress': createUserData.currentAddress, 'permanentAddress': createUserData.permanentAddress, 'aboutMe': createUserData.aboutMe,
       'noOfAssociatedUsers': 1, 'avatarLink': createUserData.avatarLink
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
    var create: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'dateOfBirth': string, 'status': boolean, 'phoneNumber': 'number',
    'organizationId': string, 'institutionId': string, 'employeeId': string, 'currentAddress': string, 'permanentAddress': string, 'aboutMe': string,
    'noOfAssociatedUsers': number, 'avatarLink': string} = 
    { 'firstName': editUserData.firstName, 'lastName': editUserData.lastName, 'role':
    editUserData.role, 'subRole': editUserData.subRole, 'email': editUserData.email,
     'dateOfBirth': editUserData.dateOfBirth, 'status': editUserData.status,
     'phoneNumber': editUserData.phoneNumber, 'organizationId': editUserData.organizationId,
     'institutionId': editUserData.institutionId, 'employeeId': editUserData.employeeId,
     'currentAddress': editUserData.currentAddress, 'permanentAddress': editUserData.permanentAddress,
      'aboutMe': editUserData.aboutMe,
     'noOfAssociatedUsers': 1, 'avatarLink': editUserData.avatarLink};
    return this.http.put(this.baseUrl + '/api/scandidate/user/'+userid, create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  //post Image
  postFile(fileToUpload: File) :Observable<any>{
    const formData: FormData = new FormData();

    formData.append('avatar', fileToUpload, fileToUpload.name);
   return this.http.post(this.baseUrl + '/api/scandidate/user/uploadavatar', formData
   
   );
  }

  deleteFile(fileDelete: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/scandidate/user/deleteavatar/:avatarLink' + fileDelete);
  }
}
