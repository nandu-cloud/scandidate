import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = environment.baseUrl;
  orgIdedit: number;
  stdIdupdate:number;
  constructor(private http: HttpClient,private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.stdIdupdate = params.id;
});
}

addStudent(val,studentData,k): Observable<any> {
  console.log(val)
  var id = window.sessionStorage.getItem('ID');
  var inistutionId = window.sessionStorage.getItem('InistutionId');
  var studentData1: { 'nameOfCourse': string, 'yearOfJoining': string ,'yearOfPassout': string ,'studentType': string, 'extraActivity': string ,
               'firstName':string , 'lastName' : string , 'roll' : string, 'email': string , 'phoneNumber' : string , 'adharNumber': string,
                'address' : number , 'addedById': string,'instituteId':string,'extraActivityDocumentName':string,'eductionalDocumentNames':string,
                'noOfEductionalDocuments': number,'intitutionName': string, 'dateOfBirth': string, 'purposeOfFile': [], 'landMark': string,
                 'city': string, 'state': string, 'zipCode': string} =
              { 'nameOfCourse': val.nameOfCourse, 'yearOfJoining': val.yearOfJoining ,'yearOfPassout': val.yearOfPassout, 'studentType' : val.studentType,
                'extraActivity': studentData.extraActivity,'firstName':val.firstName,'lastName':val.lastName,'roll':val.roll == ''?undefined:val.roll,'email': val.email,'phoneNumber':val.phoneNumber,'address':val.address , 
                'eductionalDocumentNames':studentData.eductionalDocumentNames,'noOfEductionalDocuments': studentData.noOfEductionalDocuments,'extraActivityDocumentName': studentData.extraActivityDocumentName == ""? undefined : studentData.extraActivityDocumentName ,'addedById':id ,'instituteId': inistutionId,
                'intitutionName': val.intitutionName, 'adharNumber': val.adharNumber, 'dateOfBirth': val.dateOfBirth, 'purposeOfFile': k, 'landMark': val.landMark,
                'city': val.city, 'state': val.state, 'zipCode': val.zipCode
              };
  return this.http.post(this.baseUrl + '/api/institute/operational/student', studentData1
    , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
  );
}

public getStudentData() : Observable<any> {
  var inistutionId = window.sessionStorage.getItem('InistutionId');
  return this.http.get(this.baseUrl + '/api/institute/operational/student//getAllStudent/'+inistutionId);
}

editStudent(editStuData) : Observable<any> {
  return this.http.get(this.baseUrl + '/api/institute/operational/student/' +editStuData );
}
updateStudent(updateStudentData) : Observable<any>{
  var id = window.sessionStorage.getItem('ID');
  var inistutionId = window.sessionStorage.getItem('InistutionId');
  var updatestudent: { 'nameOfCourse': string, 'yearOfJoining': string, 'yearOfPassout': string,'studentType': string, 'extraActivity': string ,
  'firstName':string , 'lastName' : string , 'roll' : string, 'email': string , 'phoneNumber' : string , 'address' : number , 'addedById': string ,
   'instituteId': string, 'extraActivityDocumentName':string,'eductionalDocumentNames':string,'noOfEductionalDocuments': number,
   'intitutionName':string, 'adharNumber': string, 'dateOfBirth': string, 'purposeOfFile': string, 'landMark': string,
   'city': string, 'state': string, 'zipCode': string} =
 { 'nameOfCourse': updateStudentData.nameOfCourse, 'yearOfJoining': updateStudentData.yearOfJoining ,'yearOfPassout': updateStudentData.yearOfPassout, 'studentType' : updateStudentData.studentType,
   'extraActivity': updateStudentData.extraActivity,'firstName':updateStudentData.firstName,'lastName':updateStudentData.lastName,'roll':updateStudentData.roll == ""?undefined: updateStudentData.roll,'email': updateStudentData.email,'phoneNumber':updateStudentData.phoneNumber,'address':updateStudentData.address , 
   'addedById':id,'instituteId' : inistutionId,'eductionalDocumentNames':updateStudentData.eductionalDocumentNames,'noOfEductionalDocuments': updateStudentData.noOfEductionalDocuments,'extraActivityDocumentName': updateStudentData.extraActivityDocumentName == ""? undefined : updateStudentData.extraActivityDocumentName,
   'intitutionName':updateStudentData.intitutionName, 'adharNumber': updateStudentData.adharNumber, 'dateOfBirth': updateStudentData.dateOfBirth, 'purposeOfFile': updateStudentData.purposeOfFile, 'landMark': updateStudentData.landMark,
   'city': updateStudentData.city, 'state': updateStudentData.state, 'zipCode': updateStudentData.zipCode
 };
  return this.http.put(this.baseUrl + '/api/institute/operational/student/' + this.stdIdupdate, updatestudent,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  })
}

postFile(fileToUpload: File) :Observable<any>{
  const formData: FormData = new FormData();
  formData.append('extraActivityDoc', fileToUpload);
 return this.http.post(this.baseUrl + '/api/institute/operational/student/uploadExtraActivityDoc', formData

 );
}

postEducationFile(fileToUpload: File[]) :Observable<any>{
  const formData: FormData = new FormData();
  for  (var i =  0; i <  fileToUpload.length; i++)  {  
    formData.append("files",  fileToUpload[i]);
} 
  // formData.append('files', fileToUpload);
 return this.http.post(this.baseUrl + '/api/institute/operational/student/uploadFiles', formData

 );
}

deleteFile(studentDocumentLink, id): Observable<any> {
  return this.http.delete(this.baseUrl + '/api/institute/operational/student/delete/' + studentDocumentLink + '/' + id);
}

viewFile(studentDocumentLink): Observable<any> {
  return this.http.get(this.baseUrl + '/api/institute/operational/student/downloadfile/' + studentDocumentLink);
}
}
