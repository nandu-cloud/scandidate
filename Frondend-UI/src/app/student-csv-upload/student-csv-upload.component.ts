import { Component, OnInit ,EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-student-csv-upload',
  templateUrl: './student-csv-upload.component.html',
  styleUrls: ['./student-csv-upload.component.css']
})
export class StudentCsvUploadComponent  {
  public uploader: FileUploader = new FileUploader({

    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['xls']


    });

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);

  }

}
