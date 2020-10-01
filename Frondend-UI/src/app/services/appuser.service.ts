import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppuserService {

  baseUrl = environment.baseUrl;
  userIdupdate: number;
  constructor(private http: HttpClient, private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userIdupdate = params.id;
    })
   }

  // Create Opps user
  createUserData(createUserData): Observable<any> {
    let organId
    let instituteeId
    if( createUserData.role == 'SCANDIDATE'){
  organId = undefined
  instituteeId = undefined
}else if(createUserData.role == 'ORGANIZATION'){
  organId = createUserData.organizationId

  instituteeId = undefined
}else{
  organId = undefined

  instituteeId=createUserData.institutionId
}
    var create: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'dateOfBirth': string, 'status': boolean, 'phoneNumber': 'number',
   'organizationId': string, 'institutionId': string, 'employeeId': string, 'currentAddress': string, 'permanentAddress': string, 'aboutMe': string,
    'noOfAssociatedUsers': number, 'avatarLink': string
  } =
    {
      'firstName': createUserData.firstName, 'lastName': createUserData.lastName, 'role':
      createUserData.role, 'subRole': createUserData.subRole, 'email': createUserData.email,
       'dateOfBirth': createUserData.dateOfBirth, 'status': createUserData.status,
       'phoneNumber': createUserData.phoneNumber,
       'organizationId': organId == ""||organId == null?undefined:organId,
       'institutionId':instituteeId == ""|| instituteeId == null?undefined:instituteeId,
        'employeeId': createUserData.employeeId == ""||createUserData.employeeId == null?undefined:createUserData.employeeId,
       'currentAddress': createUserData.currentAddress == ""||createUserData.currentAddress == null?undefined:createUserData.currentAddress,
        // tslint:disable-next-line: max-line-length
        'permanentAddress': createUserData.permanentAddress == ""||createUserData.permanentAddress == null?undefined:createUserData.permanentAddress,
         'aboutMe': createUserData.aboutMe == ""||createUserData.aboutMe == null?undefined:createUserData.aboutMe,
       'noOfAssociatedUsers': 1, 
       'avatarLink': createUserData.avatarLink == ""||createUserData.avatarLink == null?undefined:createUserData.avatarLink
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


  editUser(updateUserData): Observable<any> {
//     let organId
//     let instituteeId
//     if( updateUserData.role == 'SCANDIDATE'){
//   organId = undefined
//   instituteeId = undefined
// }else if(updateUserData.role == 'ORGANIZATION'){
//   organId = updateUserData.organizationId

//   instituteeId = undefined
// }else{
//   organId = undefined

//   instituteeId=updateUserData.institutionId
// }
    // this.editUserData = this.('emailForEdit');
    var create: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'dateOfBirth': string, 'status': boolean, 'phoneNumber': 'number',
    'organizationId': string, 'institutionId': string, 'employeeId': string, 'currentAddress': string, 'permanentAddress': string,
     'aboutMe': string, 'noOfAssociatedUsers': number, 'avatarLink': string} = 
    { 'firstName': updateUserData.firstName, 'lastName': updateUserData.lastName, 'role':
    updateUserData.role, 'subRole': updateUserData.subRole, 'email': updateUserData.email,
     'dateOfBirth': updateUserData.dateOfBirth, 'status': updateUserData.status,
     'phoneNumber': updateUserData.phoneNumber,
      'organizationId': updateUserData.organizationId == ""||updateUserData.organizationId == null?undefined:updateUserData.organizationId,
     'institutionId': updateUserData.institutionId == ""||updateUserData.institutionId == null?undefined:updateUserData.institutionId,
      'employeeId': updateUserData.employeeId == ""||updateUserData.employeeId == null?undefined:updateUserData.employeeId,
     'currentAddress': updateUserData.currentAddress == "" || updateUserData.currentAddress == null?undefined:updateUserData.currentAddress,
      'permanentAddress': updateUserData.permanentAddress == "" || updateUserData.permanentAddress == null?undefined:updateUserData.permanentAddress,
      'aboutMe': updateUserData.aboutMe == ""|| updateUserData.aboutMe == null?undefined:updateUserData.aboutMe,
     'noOfAssociatedUsers': 1,
      'avatarLink': updateUserData.avatarLink == ""|| updateUserData.avatarLink == null?undefined:updateUserData.avatarLink};
    return this.http.put(this.baseUrl + '/api/scandidate/user/'+ updateUserData._id, create
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

    formData.append('avatar', fileToUpload);
   return this.http.post(this.baseUrl + '/api/scandidate/user/uploadavatar', formData
   
   );
  }

  deleteFile(fileDelete: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/scandidate/user/deleteavatar/' + fileDelete);
  }
}
