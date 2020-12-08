import { Inject, Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployeeService } from  '../../services/employee.service' ;
import { from, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
  providers:[EmployeeService]
})
export class IssuesComponent implements OnInit {

  editEmployeeSubscription : Subscription;
  empIdedit: any;
  public setMessage: any = {};
  data1: any;
  baseUrl: any = environment.baseUrl;
  discrepancy_date:any;
  discrepancy_cause:string;
  discrepancy_upload:string;

  Compliance_date:any;
  Compliance_cause:string;
  Compliance_upload:string;

  warning_date:any; 
  warning_cause:string;
  warning_upload:string;

showCause_date:any;
showCause_cause:string;
showCause_upload:string;

performance_date:any;
performance_cause:string;
performance_upload:string;

termination_date:any;
termination_cause:string;
termination_upload:string;


  

  constructor(
    private activatedRoute: ActivatedRoute,
    public empService : EmployeeService,
    public dialogRef: MatDialogRef<IssuesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
   

  ngOnInit(): void {

    if(this.data.id){
      this.editEmployeeSubscription = this.empService.editEmployee(this.data.id).subscribe(respObj => {
        console.log("dialogbox_details"+respObj.data);
        this.data1 = respObj.data;
        console.log(this.data1);

        this.discrepancy_date   = this.data1.discrepancyDocuments.descrepencyPeriod;
        this.discrepancy_cause  = this.data1.discrepancyDocuments.descrepencyCauseActionTaken;
        this.discrepancy_upload = this.data1.discrepancyDocuments.descrepencyUploadDocument;
        

        this.Compliance_date   = this.data1.compliencyDiscrepancy.compliencyPeriod;
        this.Compliance_cause  = this.data1.compliencyDiscrepancy.compliencyCauseActionTaken;
        this.Compliance_upload = this.data1.compliencyDiscrepancy.compliencyUploadDocument;

        this.warning_date   = this.data1.warning.warningPeriod;
        this.warning_cause  = this.data1.warning.warningCauseActionTaken;
        this.warning_upload = this.data1.warning.warningUploadDocument;


        this.showCause_date   = this.data1.showCausedIssue.showCausedPeriod;
        this.showCause_cause  = this.data1.showCausedIssue.showCausedCauseActionTaken;
        this.showCause_upload = this.data1.showCausedIssue.showCausedUploadDocument;


        this.performance_date   = this.data1.suspension.suspensionPeriod;
        this.performance_cause  = this.data1.suspension.suspensionCauseActionTaken;
        this.performance_upload = this.data1.suspension.suspensionUploadDocument;


        this.termination_date   = this.data1.termination.terminationPeriod;
        this.termination_cause  = this.data1.termination.terminationCauseActionTaken;
        this.termination_upload = this.data1.termination.terminationUploadDocument;

      
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
 
}

discrepancy_download() {
  if (this.discrepancy_upload != '') {
    const temp = `${this.baseUrl}/public/organization_doc/${this.discrepancy_upload}`;
    window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  }
}

Compliance_download() {
  if (this.Compliance_upload != '') {
    const temp = `${this.baseUrl}/public/organization_doc/${this.Compliance_upload}`;
    window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  }
}

warning_download() {
  if (this.warning_upload != '') {
    const temp = `${this.baseUrl}/public/organization_doc/${this.warning_upload}`;
    window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  }
}

showCause_download() {
  if (this.showCause_upload != '') {
    const temp = `${this.baseUrl}/public/organization_doc/${this.showCause_upload}`;
    window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  }
}

performance_download() {
  if (this.performance_upload != '') {
    const temp = `${this.baseUrl}/public/organization_doc/${this.performance_upload}`;
    window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  }
}


termination_download() {
  if (this.termination_upload != '') {
    const temp = `${this.baseUrl}/public/organization_doc/${this.termination_upload}`;
    window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  }
}
  
  
}
