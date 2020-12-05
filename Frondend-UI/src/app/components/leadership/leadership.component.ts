import { Inject, Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployeeService } from  '../../services/employee.service' ;
import { from, Subscription } from 'rxjs';


@Component({
  selector: 'app-leadership',
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.css'],
  providers:[EmployeeService]
})
export class LeadershipComponent implements OnInit {

  editEmployeeSubscription : Subscription;
  empIdedit: any;
  public setMessage: any = {};
  data1: any;
  selfDriven: string;
  workIndependenty: string;
  creativity: string;
  teamWork: string;
  dealConstructivelyWithPressure: string;
  discipline: string;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    public empService : EmployeeService,
    public dialogRef: MatDialogRef<LeadershipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
   

  ngOnInit(): void {

    if(this.data.id){
      this.editEmployeeSubscription = this.empService.editEmployee(this.data.id).subscribe(respObj => {
        console.log("dialogbox_details"+respObj.data);
        this.data1 = respObj.data;
        console.log(this.data1);
      
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
 
}
  
  
}
