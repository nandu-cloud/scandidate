import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentCsvUploadService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

   //post CSV File
   postcsvFile(fileToUpload: File) :Observable<any>{
    const formData: FormData = new FormData();

    formData.append('csv', fileToUpload);
    formData.append('_id',localStorage.getItem('_id'))
    formData.append('instituteId', localStorage.getItem('instutuinId'))
    return this.http.post(this.baseUrl + '/api/institute/operational/student/uploadCsv', formData
   
   );
  }
}
