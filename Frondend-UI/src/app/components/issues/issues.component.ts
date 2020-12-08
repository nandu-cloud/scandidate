import { Inject, Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployeeService } from  '../../services/employee.service' ;
import { from, Subscription } from 'rxjs';


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

        this.discrepancy_date = this.data1.discrepancyDocuments.descrepencyPeriod;
        this.discrepancy_cause = this.data1.discrepancyDocuments.descrepencyCauseActionTaken;

      
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
 
}
  
  
}
