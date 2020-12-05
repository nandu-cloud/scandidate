import { Inject, Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployeeService } from  '../../services/employee.service' ;
import { from, Subscription } from 'rxjs';


@Component({
  selector: 'app-work-ethic-dialog',
  templateUrl: './work-ethic-dialog.component.html',
  styleUrls: ['./work-ethic-dialog.component.css'],
  providers:[EmployeeService]
})
export class WorkEthicDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<WorkEthicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
   

  ngOnInit(): void {

    if(this.data.id){
      this.editEmployeeSubscription = this.empService.editEmployee(this.data.id).subscribe(respObj => {
        console.log("dialogbox_details"+respObj.data);
        this.data1 = respObj.data;
        console.log(this.data1);

        //selfdriven

        if(this.data1.selfDriven == 1)
        {
          this.selfDriven ="Not satisfactory";
        }
        if(this.data1.selfDriven == 2)
        {
          this.selfDriven ="Needs Improvement";
        }
        if(this.data1.selfDriven == 3)
        {
          this.selfDriven ="Meets Expectations";
        }
        if(this.data1.selfDriven == 4)
        {
          this.selfDriven ="Exceeds Expectations";
        }

         //workindependtly

         if(this.data1.workIndependenty == 1)
         {
           this.workIndependenty ="Not satisfactory";
         }
         if(this.data1.workIndependenty == 2)
         {
           this.workIndependenty ="Needs Improvement";
         }
         if(this.data1.workIndependenty == 3)
         {
           this.workIndependenty ="Meets Expectations";
         }
         if(this.data1.workIndependenty == 4)
         {
           this.workIndependenty ="Exceeds Expectations";
         }

         //Creativity

         if(this.data1.creativity == 1)
         {
           this.creativity ="Not satisfactory";
         }
         if(this.data1.creativity == 2)
         {
           this.creativity ="Needs Improvement";
         }
         if(this.data1.creativity == 3)
         {
           this.creativity ="Meets Expectations";
         }
         if(this.data1.creativity == 4)
         {
           this.creativity ="Exceeds Expectations";
         }

         
         //Team Work

         if(this.data1.teamWork == 1)
         {
           this.teamWork ="Not satisfactory";
         }
         if(this.data1.teamWork == 2)
         {
           this.teamWork ="Needs Improvement";
         }
         if(this.data1.teamWork == 3)
         {
           this.teamWork ="Meets Expectations";
         }
         if(this.data1.teamWork == 4)
         {
           this.teamWork ="Exceeds Expectations";
         }

          //Deals Constructively With Pressure

          if(this.data1.dealConstructivelyWithPressure == 1)
          {
            this.dealConstructivelyWithPressure ="Not satisfactory";
          }
          if(this.data1.dealConstructivelyWithPressure == 2)
          {
            this.dealConstructivelyWithPressure ="Needs Improvement";
          }
          if(this.data1.dealConstructivelyWithPressure == 3)
          {
            this.dealConstructivelyWithPressure ="Meets Expectations";
          }
          if(this.data1.dealConstructivelyWithPressure == 4)
          {
            this.dealConstructivelyWithPressure ="Exceeds Expectations";
          }

           //discipline

           if(this.data1.discipline == 1)
           {
             this.discipline ="Not satisfactory";
           }
           if(this.data1.discipline == 2)
           {
             this.discipline ="Needs Improvement";
           }
           if(this.data1.discipline == 3)
           {
             this.discipline ="Meets Expectations";
           }
           if(this.data1.discipline == 4)
           {
             this.discipline ="Exceeds Expectations";
           }



        let logo = window.sessionStorage.getItem('logo');
      
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
 
}
  
  
}
