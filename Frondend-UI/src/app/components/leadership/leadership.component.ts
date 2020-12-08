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
  stategicThinking: string;
  stategicThinkingRemarks: string;
  problemSolving: string;
  problemSolvingRemarks: string;
  buildingHighPerformanceTeam: string;
  buildingHighPerformanceTeamRemark: string;
  stakeHolderManagment:string;
  stakeHolderManagmentRemarks:string;
  

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

        //strategicThinking

        if(this.data1.quality.IsSelect == 1)
          { this.stategicThinking ="Not satisfactory"}
        if(this.data1.quality.IsSelect == 2)
          {  this.stategicThinking="Needs Improvement"}
        if(this.data1.quality.IsSelect == 3)
          { this.stategicThinking="Meets Expectations"}
        if(this.data1.quality.IsSelect == 4) 
          {this.stategicThinking="Exceeds Expectations"}
          
          
        //problemsolving

        if(this.data1.consistency.IsSelect == 1)
        { this.problemSolving ="Not satisfactory"}
        if(this.data1.consistency.IsSelect == 2)
        {  this.problemSolving="Needs Improvement"}
        if(this.data1.consistency.IsSelect == 3)
        { this.problemSolving="Meets Expectations"}
        if(this.data1.consistency.IsSelect == 4) 
        {this.problemSolving="Exceeds Expectations"}

        //buildingHighPer

        if(this.data1.building.IsSelect == 1)
        { this.buildingHighPerformanceTeam ="Not satisfactory"}
        if(this.data1.building.IsSelect == 2)
        {  this.buildingHighPerformanceTeam="Needs Improvement"}
        if(this.data1.building.IsSelect == 3)
        { this.buildingHighPerformanceTeam="Meets Expectations"}
        if(this.data1.building.IsSelect == 4) 
        {this.buildingHighPerformanceTeam="Exceeds Expectations"}

         //buildingHighPer

         if(this.data1.stakeholder.IsSelect == 1)
           {this.stakeHolderManagment ="Not satisfactory"}
         if(this.data1.stakeholder.IsSelect == 2)
           {this.stakeHolderManagment="Needs Improvement"}
         if(this.data1.stakeholder.IsSelect == 3)
           {this.stakeHolderManagment="Meets Expectations"}
         if(this.data1.stakeholder.IsSelect == 4) 
           {this.stakeHolderManagment="Exceeds Expectations"}

           this.stategicThinkingRemarks =this.data1.quality.description;
           this.problemSolvingRemarks = this.data1.consistency.description;
           this.buildingHighPerformanceTeamRemark  = this.data1.building.description;
           this.stakeHolderManagmentRemarks = this.data1.stakeholder.description;
 


      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
 
}
  
  
}
