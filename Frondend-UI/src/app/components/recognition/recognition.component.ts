
import { Inject, Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployeeService } from  '../../services/employee.service' ;
import { from, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.css'],
  providers:[EmployeeService]
})
export class RecognitionComponent implements OnInit {

  editEmployeeSubscription : Subscription;
  empIdedit: any;
  public setMessage: any = {};
  data1: any;
  award: string;
  remark: string;
  docName: string;
  fileName: string;
  baseUrl: any = environment.baseUrl;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    public empService : EmployeeService,
    public dialogRef: MatDialogRef<RecognitionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    



  ngOnInit(): void {

    if(this.data.id){
      this.editEmployeeSubscription = this.empService.editEmployee(this.data.id).subscribe(respObj => {
        console.log("dialogbox_details"+respObj.data);
        this.data1 = respObj.data;
        console.log(this.data1);

        this.award = this.data1.awards.IsSelect;
        this.remark=this.data1.awards.remarks;
        this.docName=this.data1.awards.documentName;
        this.fileName=this.data1.awards.documentUpload;


      
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
 
}

downloadDoc() {
  if (this.fileName != '') {
    const temp = `${this.baseUrl}/public/organization_doc/${this.fileName}`;
    window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  }
}
  
  
}
