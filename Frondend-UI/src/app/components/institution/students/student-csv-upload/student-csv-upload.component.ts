import { Component, OnInit ,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs';
import { StudentCsvUploadService } from '../../../../services/student-csv-upload.service';
@Component({
  selector: 'app-student-csv-upload',
  templateUrl: './student-csv-upload.component.html',
  styleUrls: ['./student-csv-upload.component.css']
})
export class StudentCsvUploadComponent  {
  fileSubscription: Subscription;
  csvupload: FormGroup
  file: File = null;
  constructor(private studentcsvuploadService: StudentCsvUploadService){
    this.csvupload = new FormGroup({
      csv: new FormControl()
    })
  }
  
  public uploader: FileUploader = new FileUploader({

    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['xls']


    });

  public onFileSelected(event) {
    const file: File = event[0];
    console.log(file);
    
    this.fileSubscription = this.studentcsvuploadService.postcsvFile(file).subscribe(
      data => {
        console.log(data.data.csv);
      }
    )
  }

  onSubmit(){
    const formData = new FormData();
  }
}
