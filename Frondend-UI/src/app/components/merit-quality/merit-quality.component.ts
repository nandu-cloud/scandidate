import { Inject, Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployeeService } from  '../../services/employee.service' ;
import { from, Subscription } from 'rxjs';



@Component({
  selector: 'app-merit-quality',
  templateUrl: './merit-quality.component.html',
  styleUrls: ['./merit-quality.component.css'],
  providers:[EmployeeService]
})
export class MeritQualityComponent implements OnInit {

  editEmployeeSubscription : Subscription;
  empIdedit: any;
  public setMessage: any = {};
  data1: any;
  communicationSkills: string;
  industryKnowledge: string;
  productKnowledge: string;
  subMatter: string;
  keyskills: string;
  rehireAgain: string;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    public empService : EmployeeService,
    public dialogRef: MatDialogRef<MeritQualityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
   

  ngOnInit(): void {

    if(this.data.id){
      this.editEmployeeSubscription = this.empService.editEmployee(this.data.id).subscribe(respObj => {
        console.log("dialogbox_details"+respObj.data);
        this.data1 = respObj.data;
        console.log(this.data1);

        //comm skill
         
        if(this.data1.communicationSkills == 1)
        {
          this.communicationSkills ="Basic";
        }
        if(this.data1.communicationSkills == 2)
        {
          this.communicationSkills ="Intermediate";
        }
        if(this.data1.communicationSkills == 3)
        {
          this.communicationSkills ="Proficient";
        }
        if(this.data1.communicationSkills == 4)
        {
          this.communicationSkills ="Expert";
        }

        //industry know
        
        if(this.data1.industryKnowledge == 1)
        {
          this.industryKnowledge ="Basic";
        }
        if(this.data1.industryKnowledge == 2)
        {
          this.industryKnowledge ="Intermediate";
        }
        if(this.data1.industryKnowledge == 3)
        {
          this.industryKnowledge ="Proficient";
        }
        if(this.data1.industryKnowledge == 4)
        {
          this.industryKnowledge ="Expert";
        }

        //pro unders
        
        if(this.data1.productKnowledge == 1)
        {
          this.productKnowledge ="Basic";
        }
        if(this.data1.productKnowledge == 2)
        {
          this.productKnowledge ="Intermediate";
        }
        if(this.data1.productKnowledge == 3)
        {
          this.productKnowledge ="Proficient";
        }
        if(this.data1.productKnowledge == 4)
        {
          this.productKnowledge ="Expert";
        }

         //sub matter to expertise
        
         if(this.data1.academicKnowledge == 1)
         {
           this.subMatter ="Basic";
         }
         if(this.data1.academicKnowledge == 2)
         {
           this.subMatter ="Intermediate";
         }
         if(this.data1.academicKnowledge == 3)
         {
           this.subMatter ="Proficient";
         }
         if(this.data1.academicKnowledge == 4)
         {
           this.subMatter ="Expert";
         }
         //key skills and rehire

         this.keyskills = this.data1.keySkills;
         this.rehireAgain =this.data1.rehireAgain;
      
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
 
}
  
  
}
