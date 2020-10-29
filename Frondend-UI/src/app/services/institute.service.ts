import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class instituteService  {
  baseUrl = environment.baseUrl;
  instituteIdedit: number;
  instituteIdupdate: number;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.instituteIdupdate = params.id;
    });
  }
  public checkAddInstitute(addInstituteData): Observable<any> {
    var instituteData: {
      'instituteName': string,
      'contactPersonName': string,
      'instituteAddress': string,
      'instituteType': string,
      'instituteEmail': string,
      'instituteStudentSize': number,
      'instituteActiveFrom': string,
      'instituteZIP': number,
      'instituteDescription': string,
      'status': boolean,
      'contact': number, 'code': string,
      'instituteLogo' : string,
      'instituteLocation':string,
      'state':string
    } =
    {
      'instituteName': addInstituteData.instituteName,
      'contactPersonName': addInstituteData.contactPersonName,
      'instituteAddress': addInstituteData.instituteAddress,
      'instituteType': addInstituteData.instituteType,
      'instituteEmail': addInstituteData.instituteEmail,
      'instituteStudentSize': addInstituteData.instituteStudentSize,
      'instituteActiveFrom': addInstituteData.instituteActiveFrom,
      'instituteZIP': addInstituteData.instituteZIP,
      'instituteDescription': addInstituteData.instituteDescription,
      'status': true, 'contact': addInstituteData.contact,
      'code': addInstituteData.code,
      'instituteLocation':addInstituteData.instituteLocation,
      'state':addInstituteData.state,
      'instituteLogo': addInstituteData.instituteLogo == ""?undefined:addInstituteData.instituteLogo
    };
    return this.http.post(this.baseUrl + '/api/scandidate/institute', instituteData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
  public getInstitutionList(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/scandidate/institute');
  }

  public editInstitute(editInstituteData): Observable<any> {
    return this.http.get(this.baseUrl + '/api/scandidate/institute/' + editInstituteData);
  }

  //post Image
  postFile(fileToUpload: File) :Observable<any>{
    const formData: FormData = new FormData();
    formData.append('logo', fileToUpload);
   return this.http.post(this.baseUrl + '/api/scandidate/institute/uploadlogo', formData

   );
  }

  //Delete Image
  deleteFile(fileDelete: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/scandidate/institute/deletelogo/'+fileDelete);
  }

  public updateInstitute(updateInstituteData): Observable<any> {
    var instituteData: {
      'instituteName': string,
      'contactPersonName': string,
      'instituteAddress': string,
      'instituteType': string,
      'instituteEmail': string,
      'instituteStudentSize': number,
      'instituteActiveFrom': string,
      'instituteZIP': number,
      'instituteDescription': string,
      'status': boolean,
      'contact': number, 'code': string,
      'instituteLogo' : string
    } =
    {
      'instituteName': updateInstituteData.instituteName,
      'contactPersonName': updateInstituteData.contactPersonName,
      'instituteAddress': updateInstituteData.instituteAddress,
      'instituteType': updateInstituteData.instituteType,
      'instituteEmail': updateInstituteData.instituteEmail,
      'instituteStudentSize': updateInstituteData.instituteStudentSize,
      'instituteActiveFrom': updateInstituteData.instituteActiveFrom,
      'instituteZIP': updateInstituteData.instituteZIP,
      'instituteDescription': updateInstituteData.instituteDescription,
      'status': updateInstituteData.status, 'contact': updateInstituteData.contact,
      'code': updateInstituteData.code,
      'instituteLogo': updateInstituteData.instituteLogo,
    };
    return this.http.put(this.baseUrl + '/api/scandidate/institute/'+this.instituteIdupdate, instituteData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }

  //Get student list
  public getAllStudentData(searchParams) : Observable<any>{
    var searchData: { 'firstName':string,'yearOfPassout': string, 'phoneNumber': string ,'intitutionName': string } =
                    { 'firstName':searchParams.firstName,'yearOfPassout': searchParams.yearOfPassout,'phoneNumber': searchParams.phoneNumber,'intitutionName':searchParams.intitutionName};
    return this.http.post(this.baseUrl + '/api/scandidate/institute/student/search' ,searchData
    );
  }
}
