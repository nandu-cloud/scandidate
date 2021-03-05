import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BgvSearchService } from 'src/app/services/bgv-search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-bgv-report-dialog',
  templateUrl: './send-bgv-report-dialog.component.html',
  styleUrls: ['./send-bgv-report-dialog.component.css']
})
export class SendBgvReportDialogComponent implements OnInit {

  sendbgvForm: FormGroup;
  baseUrl: any = environment.baseUrl;
  originalFileName: any;
  sendbgvmailSubscription: Subscription;
  // dialog: any;
  setMessage: { message: any; error: boolean; };
  error: any;
  constructor(public bgvService: BgvSearchService, public dialog: MatDialog,
     public dialogRef: MatDialogRef<SendBgvReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      
    this.sendbgvForm = new FormGroup({
      email: new FormControl(''),
      subject: new FormControl(''),
      message: new FormControl('')
      
    });
  }
   
  
  ngOnInit(): void {
      // var originalFileName = `${this.baseUrl}/public/report-excel/${this.data.fileName}`;
       this.originalFileName = this.data.fileName;
  }
  methodtype;
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    });
    dialogRef.componentInstance.methodType = this.methodtype;
  }
  submit(){
    this.sendbgvmailSubscription = this.bgvService.sendmail(this.sendbgvForm, this.originalFileName).subscribe(resp =>{
      this.methodtype = 'save';
      this.openDialog();
      // alert("Send mail");
    }, err => {
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    }
    )
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
})
export class DialogElementsExampleDialog {
  @Input() methodType: any
  Message: any;
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>, private router: Router
  ) {
    console.log(this.methodType)
  }

  ngOnInit() {
    console.log(this.methodType)
    // if (this.methodType == 'update') {
    //   this.Message = "Employee  Updated successfully"
    // } 
     if(this.methodType == 'save') {
      this.Message = "Send Mail successfully"
    }
     else {
      this.Message ="Not Sent Mail successfully"
    }
  }

  close() {
    this.dialogRef.close(true);
    // this.router.navigate(['/candidate-list']);
  }
}