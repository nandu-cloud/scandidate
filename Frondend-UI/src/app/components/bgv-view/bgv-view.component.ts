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
// import * as fileSaver from 'file-saver';
import { saveAs } from 'file-saver/dist/FileSaver';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'bgv-view',
  templateUrl: './bgv-view.component.html',
  styleUrls: ['./bgv-view.component.css'],
  providers: [BgvSearchService,StorageService,DatePipe]
})
export class BGVViewComponent implements OnInit {


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
  bgvListSubscription : Subscription;
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
  doc: any =[];
  empId: number;
  y : any;
  m : any;
  m1 : any;
  edudoc;
  result;
  res: any;
  data_logo: any;
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
          this.edudoc = respObj.data[0].eductionalDocumentNames;
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
              console.log(result);
               
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
             if(this.data[i].eductionalDocumentNames){
            for(let j = 0; j < this.data[i].eductionalDocumentNames.length; j++){
              this.doc.push({"docName":this.data[i].eductionalDocumentNames[j]});
              console.log(this.doc);

            }
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

  
  downloadPDF(){
    if(this.empIdedit){
      this.editEmployeeSubscription = this.empService.ViewCandidate(this.empIdedit).subscribe(respObj => {
        console.log("records"+respObj.data);
        this.data = respObj.data;
            //para for org logo
            var result = [];
            for (let i = 0; i < this.data.length; i++) {
              if(this.data[i].organisationId)
              {
                this.orgId = [];
              var id = this.data[i].organisationId
              this.orgId.push(id);
              }
             }
            for (let i = 0; i < this.data.length; i++) {
            if(this.data[i].instituteId)
           {
            this.instId = [];
            var id = this.data[i].instituteId
            this.instId.push(id);
           }
             }
             console.log(this.instId);

          this.viewLogoSubscription = this.empService.ViewLogo(this.orgId,this.instId).subscribe(respObj => {
          this.data_logo = respObj.data;
          console.log("logo details");
          console.log(this.data_logo); 

        
           this.bgvListSubscription = this.empService.download_PDF(this.data,this.data_logo).subscribe(respObj => {
            let blob = new Blob([respObj], {type: 'application/pdf'});
            let filename = this.data[0].firstName + ' ' +this.data[0].lastName + '.pdf'
            saveAs(blob, filename);
            // alert('Download');
      //       const temp = `${this.baseUrl}/public/scandidate-report/${this.data,this.data_logo}`;
      // window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
         
           }, err => {
          this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
           })  
  
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })

    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
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

