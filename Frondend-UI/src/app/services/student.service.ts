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

addStudent(studentData): Observable<any> {
  var id = window.sessionStorage.getItem('ID');
  var inistutionId = window.sessionStorage.getItem('InistutionId');
  var studentData1: { 'nameOfCourse': string, 'yearOfJoining': number ,'yearOfPassout': number ,'studentType': string, 'extraActivity': string ,
               'firstName':string , 'lastName' : string , 'roll' : string, 'email': string , 'phoneNumber' : number , 'aadharNo': number, 'address' : number , 'addedById': string,'instituteId':string,'extraActivityDocumentName':string,'eductionalDocumentNames':string,'noOfEductionalDocuments': number,'intitutionName': string} =
              { 'nameOfCourse': studentData.nameOfCourse, 'yearOfJoining': studentData.yearOfJoining ,'yearOfPassout': studentData.yearOfPassout, 'studentType' : studentData.studentType,
                'extraActivity': studentData.extraActivity,'firstName':studentData.firstName,'lastName':studentData.lastName,'roll':studentData.roll,'email': studentData.email,'phoneNumber':studentData.phoneNumber,'address':studentData.address , 
                'eductionalDocumentNames':studentData.eductionalDocumentNames,'noOfEductionalDocuments': studentData.noOfEductionalDocuments,'extraActivityDocumentName': studentData.extraActivityDocumentName == ""? undefined : studentData.extraActivityDocumentName ,'addedById':id ,'instituteId': inistutionId,
                'intitutionName': studentData.intitutionName, 'aadharNo': studentData.aadharNo
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
  var updatestudent: { 'nameOfCourse': string, 'yearOfJoining': number ,'yearOfPassout': number ,'studentType': string, 'extraActivity': string ,
  'firstName':string , 'lastName' : string , 'roll' : string, 'email': string , 'phoneNumber' : number , 'address' : number , 'addedById': string ,
   'instituteId': string, 'extraActivityDocumentName':string,'eductionalDocumentNames':string,'noOfEductionalDocuments': number,'intitutionName':string, 'aadharNo': number} =
 { 'nameOfCourse': updateStudentData.nameOfCourse, 'yearOfJoining': updateStudentData.yearOfJoining ,'yearOfPassout': updateStudentData.yearOfPassout, 'studentType' : updateStudentData.studentType,
   'extraActivity': updateStudentData.extraActivity,'firstName':updateStudentData.firstName,'lastName':updateStudentData.lastName,'roll':updateStudentData.roll,'email': updateStudentData.email,'phoneNumber':updateStudentData.phoneNumber,'address':updateStudentData.address , 
   'addedById':id,'instituteId' : inistutionId,'eductionalDocumentNames':updateStudentData.eductionalDocumentNames,'noOfEductionalDocuments': updateStudentData.noOfEductionalDocuments,'extraActivityDocumentName': updateStudentData.extraActivityDocumentName == ""? undefined : updateStudentData.extraActivityDocumentName,
   'intitutionName':updateStudentData.intitutionName, 'aadharNo': updateStudentData.aadharNo
 };
  return this.http.put(this.baseUrl + '/api/institute/operational/student/' +this.stdIdupdate, updatestudent,
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
}
