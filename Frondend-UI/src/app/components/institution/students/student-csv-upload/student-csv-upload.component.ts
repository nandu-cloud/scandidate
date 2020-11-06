import { Component, OnInit ,EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentCsvUploadService } from '../../../../services/student-csv-upload.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-csv-upload',
  templateUrl: './student-csv-upload.component.html',
  styleUrls: ['./student-csv-upload.component.css']
})
export class StudentCsvUploadComponent  {
  fileSubscription: Subscription;
  csvupload: FormGroup
  file: File = null;
  setMessage: any = {};
  msg: String; status: String;
  error = '';
  constructor(private studentcsvuploadService: StudentCsvUploadService, public dialog: MatDialog){
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

    methodtype;
    openDialog() {
      const dialogRef = this.dialog.open(DialogElementsExampleDialog,{

      });
      dialogRef.componentInstance.methodType = this.methodtype;
    }
  public onFileSelected(event) {

    const file: File = event[0];
    console.log(file);
    // if(!this.csvupload){
    this.fileSubscription = this.studentcsvuploadService.postcsvFile(file).subscribe(
      data => {
        this.methodtype = "update";
        this.openDialog();
        this.uploader.queue.map((v,ind)=>{
         return ({...v,class:'right'})

            })
            setTimeout(() => {
              console.log(this.uploader)

            }, 100);
        this.teee ='right'

        // alert()
        console.log(data.data.csv);
        // console.log(event);
      }, err => {
        console.log(this.uploader.queue)
        // this.uploader.queue=[]
        this.methodtype=err.error.error;
        this.openDialog()
        // alert(err.error.error)
        this.teee ='wrong'

        this.error = this.setMessage.message;
        this.setMessage = 
        { message: err.error.message, error: true };
        throw this.setMessage.message;
      }
    )
    // }
  }
  teee;
  onSubmit(){
    const formData = new FormData();
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
})
export class DialogElementsExampleDialog {
  @Input() methodType: any
  Message: any;
  messageType
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,private router:Router
    ) {
      console.log(this.methodType)
    }

    ngOnInit(){
      console.log(this.methodType)
      if(this.methodType == 'update'){
       this.messageType="Success"
        this.Message="Student csv upload successfully"
      }else{
       this.messageType="Error"

        this.Message= this.methodType
      }
    }
  close(){
    this.dialogRef.close(true);
    // this.router.navigate(['/student-list']);
 }
}
