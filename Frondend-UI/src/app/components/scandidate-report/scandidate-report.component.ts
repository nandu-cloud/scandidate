import { Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { BgvSearchService } from  '../../services/bgv-search.service' ;
import { StorageService } from '../../services/storage.service';
import { from, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WorkEthicDialogComponent } from '../work-ethic-dialog/work-ethic-dialog.component';
import { MeritQualityComponent } from '../merit-quality/merit-quality.component';
import { RecognitionComponent } from '../recognition/recognition.component';
import { LeadershipComponent } from '../leadership/leadership.component';
import { IssuesComponent } from '../issues/issues.component';

import { DatePipe } from '@angular/common';
import * as moment from 'moment';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

  @Component({
    selector: 'app-scandidate-report',
    templateUrl: './scandidate-report.component.html',
    styleUrls: ['./scandidate-report.component.css'],
    providers: [BgvSearchService,StorageService,DatePipe]
  })
  export class ScandidateReportComponent implements OnInit {


//   public convetToPDF()
// {
// var data = document.getElementById('contentToConvert');
// html2canvas(data).then(canvas => {
// // Few necessary setting options
// var imgWidth = 208;
// var pageHeight = 295;
// var imgHeight = canvas.height * imgWidth / canvas.width;
// var heightLeft = imgHeight;
 
// const contentDataURL = canvas.toDataURL('image/png')
// let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
// var position = 0;
// pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
// pdf.save('new-file.pdf'); // Generated PDF
// });
// }
  createCandidate: FormGroup;
  employeeSubscription : Subscription;
  editEmployeeSubscription : Subscription;
  viewLogoSubscription : Subscription;
  employeeUpdateSubscription: Subscription;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date;
  public setMessage: any = {};
  error = '';
  empIdedit: any;
  id;
  data;
  empIdupdate: number;
  termination: string;
  showCase : string;
  suspention : string;
  discrepancy: string;
  compliance : string;
  warning : string;
  FirstName: any;
  lastName: any;
  email: any;
  dob: any;
  aadhar: any;
  phone: any;
  imageUrl: string;
  baseUrl = environment.baseUrl;
  OrgData: any;
  orgId=[];
  instId =[];
  data1=[];
  orgId1=[];
  instId1=[];
  orgLogo: string;
  instLogo: string;
  myDate: Date;
  pan_card: any;
  proExp: any;
  exYear: any;
  joinYear: any;
  exMonth: any;
  joinMonth: any;
  totMonths: any;
  totYears: any;
  months: any;
  totalExp: any;
  years: any;
  proMonth: any;
  proYear: any;
  totalMonth: any = [];
  totalYears: any = [];
  empId: number;
  doc: any =[];

  y : any;
  m : any;
  m1 : any;
  edudoc;
  result;
    selfDriven: string;
    workIndependenty: string;
    creativity: string;
    teamWork: string;
    dealConstructivelyWithPressure: string;
    discipline: string;
    subMatter: string;
    productKnowledge: string;
    industryKnowledge: string;
    communicationSkills: string;
    problemSolving: string;
    buildingHighPerformanceTeam: string;
    stakeHolderManagment: string;
    stategicThinking: string;
    termination_upload: any;
    termination_cause: any;
    termination_date: any;
    performance_upload: any;
    performance_cause: any;
    performance_date: any;
    showCause_upload: any;
    showCause_cause: any;
    discrepancy_cause: any;
    discrepancy_date: any;
    discrepancy_upload: any;
    Compliance_date: any;
    Compliance_cause: any;
    Compliance_upload: any;
    warning_date: any;
    warning_cause: any;
    warning_upload: any;
    showCause_date: any;
  //fileName: string;
  constructor(
    public fb: FormBuilder,private _storage: StorageService,
    private cd: ChangeDetectorRef,public dialog: MatDialog,public route:ActivatedRoute,public empService : BgvSearchService,private datePipe: DatePipe
  ) {
    this.route.params.subscribe(params => {
      this.empIdedit = params.id;
  });
   
  }
  ngOnInit(): void {
    if(this.empIdedit){
      this.editEmployeeSubscription = this.empService.ViewCandidate(this.empIdedit).subscribe(respObj => {
        console.log("records"+respObj.data);
        this.data = respObj.data;
        for (let i = 0; i < this.data.length; i++) {
          if(this.data[i].organisationId)
          {
            let logo = window.sessionStorage.getItem('logo');
            this.imageUrl=`${this.baseUrl}/public/user_avatar/${logo}`;
            // this.edudoc = respObj.data[2].eductionalDocumentNames;
            console.log(this.data);
            this.FirstName = this.data[0].firstName;
            this.lastName = this.data[0].lastName;
            this.email = this.data[0].email;
            this.dob = this.data[0].dateOfBirth;
            this.aadhar = this.data[0].adharNumber;
            this.phone = this.data[0].phoneNumber;
            this.pan_card = this.data[0].panNumber;
            this.id = respObj.data._id;
            this.myDate = new Date();
          }
        }
        for (let i = 0; i < this.data.length; i++) {
          if(this.data[i].instituteId)
         {
          let logo = window.sessionStorage.getItem('logo');
          this.imageUrl=`${this.baseUrl}/public/user_avatar/${logo}`;
          this.edudoc = respObj.data[2].eductionalDocumentNames;
          console.log(this.data);
          this.FirstName = this.data[0].firstName;
          this.lastName = this.data[0].lastName;
          this.email = this.data[0].email;
          this.dob = this.data[0].dateOfBirth;
          this.aadhar = this.data[0].adharNumber;
          this.phone = this.data[0].phoneNumber;
          this.pan_card = this.data[0].panNumber;
          this.id = respObj.data._id;
          this.myDate = new Date();
         }
        }
      
        //let instLogo =`${this.baseUrl}/public/institute_logo/`;
        //let orgLogo =`${this.baseUrl}/public/organization_logo/`;
            //para for org logo
            var result = [];
            for (let i = 0; i < this.data.length; i++) {
              if(this.data[i].organisationId)
              {
              const data = this.data[i].organisationId
              this.orgId.push(data);
             // this.fileName=this.data[i].awards.documentUpload;
              var date = this.data[i].dateOfJoining;
              var date1 = this.data[i].exitDate;
              this.joinMonth = this.datePipe.transform(date,"MM/dd/yyyy");
              this.exMonth = this.datePipe.transform(date1,'MM/dd/yyyy');
              this.months = moment(this.exMonth).diff(moment(this.joinMonth), 'month', true);
              result.push({month:this.months});

              //work ethic section
               //selfdriven

        if(this.data[i].selfDriven == 1)
        {this.selfDriven ="Not satisfactory";}
        if(this.data[i].selfDriven == 2)
        {this.selfDriven ="Needs Improvement";}
        if(this.data[i].selfDriven == 3)
        {this.selfDriven ="Meets Expectations";}
        if(this.data[i].selfDriven == 4)
        {this.selfDriven ="Exceeds Expectations";}

         //workindependtly

         if(this.data[i].workIndependenty == 1)
         {
           this.workIndependenty ="Not satisfactory";
         }
         if(this.data[i].workIndependenty == 2)
         {
           this.workIndependenty ="Needs Improvement";
         }
         if(this.data[i].workIndependenty == 3)
         {
           this.workIndependenty ="Meets Expectations";
         }
         if(this.data[i].workIndependenty == 4)
         {
           this.workIndependenty ="Exceeds Expectations";
         }

         //Creativity

         if(this.data[i].creativity == 1)
         {
           this.creativity ="Not satisfactory";
         }
         if(this.data[i].creativity == 2)
         {
           this.creativity ="Needs Improvement";
         }
         if(this.data[i].creativity == 3)
         {
           this.creativity ="Meets Expectations";
         }
         if(this.data[i].creativity == 4)
         {
           this.creativity ="Exceeds Expectations";
         }

         
         //Team Work

         if(this.data[i].teamWork == 1)
         {
           this.teamWork ="Not satisfactory";
         }
         if(this.data[i].teamWork == 2)
         {
           this.teamWork ="Needs Improvement";
         }
         if(this.data[i].teamWork == 3)
         {
           this.teamWork ="Meets Expectations";
         }
         if(this.data[i].teamWork == 4)
         {
           this.teamWork ="Exceeds Expectations";
         }

          //Deals Constructively With Pressure

          if(this.data[i].dealConstructivelyWithPressure == 1)
          {
            this.dealConstructivelyWithPressure ="Not satisfactory";
          }
          if(this.data[i].dealConstructivelyWithPressure == 2)
          {
            this.dealConstructivelyWithPressure ="Needs Improvement";
          }
          if(this.data[i].dealConstructivelyWithPressure == 3)
          {
            this.dealConstructivelyWithPressure ="Meets Expectations";
          }
          if(this.data[i].dealConstructivelyWithPressure == 4)
          {
            this.dealConstructivelyWithPressure ="Exceeds Expectations";
          }

           //discipline

           if(this.data[i].discipline == 1)
           {
             this.discipline ="Not satisfactory";
           }
           if(this.data[i].discipline == 2)
           {
             this.discipline ="Needs Improvement";
           }
           if(this.data[i].discipline == 3)
           {
             this.discipline ="Meets Expectations";
           }
           if(this.data[i].discipline == 4)
           {
             this.discipline ="Exceeds Expectations";
           }
//end of work ethic

            //merit-quality

              //comm skill
         
        if(this.data[i].communicationSkills == 1)
        {
          this.communicationSkills ="Basic";
        }
        if(this.data[i].communicationSkills == 2)
        {
          this.communicationSkills ="Intermediate";
        }
        if(this.data[i].communicationSkills == 3)
        {
          this.communicationSkills ="Proficient";
        }
        if(this.data[i].communicationSkills == 4)
        {
          this.communicationSkills ="Expert";
        }

        //industry know
        
        if(this.data[i].industryKnowledge == 1)
        {
          this.industryKnowledge ="Basic";
        }
        if(this.data[i].industryKnowledge == 2)
        {
          this.industryKnowledge ="Intermediate";
        }
        if(this.data[i].industryKnowledge == 3)
        {
          this.industryKnowledge ="Proficient";
        }
        if(this.data[i].industryKnowledge == 4)
        {
          this.industryKnowledge ="Expert";
        }

        //pro unders
        
        if(this.data[i].productKnowledge == 1)
        {
          this.productKnowledge ="Basic";
        }
        if(this.data[i].productKnowledge == 2)
        {
          this.productKnowledge ="Intermediate";
        }
        if(this.data[i].productKnowledge == 3)
        {
          this.productKnowledge ="Proficient";
        }
        if(this.data[i].productKnowledge == 4)
        {
          this.productKnowledge ="Expert";
        }

         //sub matter to expertise
        
         if(this.data[i].academicKnowledge == 1)
         {
           this.subMatter ="Basic";
         }
         if(this.data[i].academicKnowledge == 2)
         {
           this.subMatter ="Intermediate";
         }
         if(this.data[i].academicKnowledge == 3)
         {
           this.subMatter ="Proficient";
         }
         if(this.data[i].academicKnowledge == 4)
         {
           this.subMatter ="Expert";
         }

            //end of merit quality

            //leadership

            //strategicThinking

        if(this.data[i].quality.IsSelect == 1)
        { this.stategicThinking ="Not satisfactory"}
      if(this.data[i].quality.IsSelect == 2)
        {  this.stategicThinking="Needs Improvement"}
      if(this.data[i].quality.IsSelect == 3)
        { this.stategicThinking="Meets Expectations"}
      if(this.data[i].quality.IsSelect == 4) 
        {this.stategicThinking="Exceeds Expectations"}
        
        
      //problemsolving

      if(this.data[i].consistency.IsSelect == 1)
      { this.problemSolving ="Not satisfactory"}
      if(this.data[i].consistency.IsSelect == 2)
      {  this.problemSolving="Needs Improvement"}
      if(this.data[i].consistency.IsSelect == 3)
      { this.problemSolving="Meets Expectations"}
      if(this.data[i].consistency.IsSelect == 4) 
      {this.problemSolving="Exceeds Expectations"}

      //buildingHighPer

      if(this.data[i].building.IsSelect == 1)
      { this.buildingHighPerformanceTeam ="Not satisfactory"}
      if(this.data[i].building.IsSelect == 2)
      {  this.buildingHighPerformanceTeam="Needs Improvement"}
      if(this.data[i].building.IsSelect == 3)
      { this.buildingHighPerformanceTeam="Meets Expectations"}
      if(this.data[i].building.IsSelect == 4) 
      {this.buildingHighPerformanceTeam="Exceeds Expectations"}

       //buildingHighPer

       if(this.data[i].stakeholder.IsSelect == 1)
         {this.stakeHolderManagment ="Not satisfactory"}
       if(this.data[i].stakeholder.IsSelect == 2)
         {this.stakeHolderManagment="Needs Improvement"}
       if(this.data[i].stakeholder.IsSelect == 3)
         {this.stakeHolderManagment="Meets Expectations"}
       if(this.data[i].stakeholder.IsSelect == 4) 
         {this.stakeHolderManagment="Exceeds Expectations"}

         //issues

         this.discrepancy_date   = this.data[i].discrepancyDocuments.descrepencyPeriod;
         this.discrepancy_cause  = this.data[i].discrepancyDocuments.descrepencyCauseActionTaken;
         this.discrepancy_upload = this.data[i].discrepancyDocuments.descrepencyUploadDocument;
         
 
         this.Compliance_date   = this.data[i].compliencyDiscrepancy.compliencyPeriod;
         this.Compliance_cause  = this.data[i].compliencyDiscrepancy.compliencyCauseActionTaken;
         this.Compliance_upload = this.data[i].compliencyDiscrepancy.compliencyUploadDocument;
 
         this.warning_date   = this.data[i].warning.warningPeriod;
         this.warning_cause  = this.data[i].warning.warningCauseActionTaken;
         this.warning_upload = this.data[i].warning.warningUploadDocument;
 
 
         this.showCause_date   = this.data[i].showCausedIssue.showCausedPeriod;
         this.showCause_cause  = this.data[i].showCausedIssue.showCausedCauseActionTaken;
         this.showCause_upload = this.data[i].showCausedIssue.showCausedUploadDocument;
 
 
         this.performance_date   = this.data[i].suspension.suspensionPeriod;
         this.performance_cause  = this.data[i].suspension.suspensionCauseActionTaken;
         this.performance_upload = this.data[i].suspension.suspensionUploadDocument;
 
 
         this.termination_date   = this.data[i].termination.terminationPeriod;
         this.termination_cause  = this.data[i].termination.terminationCauseActionTaken;
         this.termination_upload = this.data[i].termination.terminationUploadDocument;

               
              }
            }
             let sum: number = 0;
             result.forEach(a => sum += a.month);
             console.log(sum);
                 this.m = sum % 12,
                 this.y = Math.floor(sum / 12);
                 this.m1 = Math.floor(this.m);
          for (let i = 0; i < this.data.length; i++) {
            if(this.data[i].instituteId)
           {
            const data = this.data[i].instituteId
            this.instId.push(data);
            this.proExp = this.data[i].dateOfJoining

            for(let j = 0; j < this.data[i].eductionalDocumentNames.length; j++){
              this.doc.push({"docName":this.data[i].eductionalDocumentNames[j]});
              console.log(this.doc);

            }

             }

            
           }
           console.log(this.instId);

           this.viewLogoSubscription = this.empService.ViewLogo(this.orgId,this.instId).subscribe(respObj => {
            this.data1 = respObj.data;
            console.log("logo details");
            console.log(this.data1); 
            this.orgLogo = `${this.baseUrl}/public/organization_logo/`;
            console.log(this.orgLogo);
            this.instLogo = `${this.baseUrl}/public/institute_logo/`;


           }, err => {
            this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
          })  
        
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
  
    
  }

  downloadDoc(fileName) {
    if (fileName != '') {
      const temp = `${this.baseUrl}/public/organization_doc/${fileName}`;
      window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
    }
  }

  downloadstuDoc(fileName) {
    if (fileName != '') {
      const temp = `${this.baseUrl}/public/student_doc/${fileName}`;
      window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
    }
  }
  
  openDialog(empId:number): void {
    const dialogRef = this.dialog.open(WorkEthicDialogComponent,{
      width: '600px',disableClose: true ,
      data: {
        id: empId
      }   
    });   
}

openMeritDialog(empId:number): void {
  const dialogRef = this.dialog.open(MeritQualityComponent,{
    width: '600px',disableClose: true ,
    data: {
      id: empId
    }   
  });   
}

openRecognitionDialog(empId:number): void {
  const dialogRef = this.dialog.open(RecognitionComponent,{
    width: '500px',disableClose: true ,
    data: {
      id: empId
    }   
  });   
}

openLeadershipDialog(empId:number): void {
  const dialogRef = this.dialog.open(LeadershipComponent,{
    width: '700px',disableClose: true ,
    data: {
      id: empId
    }   
  });   
}

openIssuesDialog(empId:number): void {
  const dialogRef = this.dialog.open(IssuesComponent,{
    width: '700px',disableClose: true ,
    data: {
      id: empId
    }   
  });   
}


}

