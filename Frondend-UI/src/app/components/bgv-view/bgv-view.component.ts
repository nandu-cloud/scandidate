import { Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { BgvSearchService } from  '../../services/bgv-search.service' ;
import { StorageService } from '../../services/storage.service';
import { from, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'bgv-view',
  templateUrl: './bgv-view.component.html',
  styleUrls: ['./bgv-view.component.css'],
  providers: [BgvSearchService,StorageService]
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
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,public route:ActivatedRoute,public empService : BgvSearchService
  ) {
    this.route.params.subscribe(params => {
      this.empIdedit = params.id;
  });
   
  }





  ngOnInit(): void {
    if(this.empIdedit){
      this.editEmployeeSubscription = this.empService.ViewCandidate(this.empIdedit).subscribe(respObj => {
        console.log(respObj.data);
        let logo = window.sessionStorage.getItem('logo');
        this.imageUrl=`${this.baseUrl}/public/user_avatar/${logo}`;
        this.data = respObj.data
        console.log(this.data);
        this.FirstName = this.data[0].firstName;
        this.lastName = this.data[0].lastName;
        this.email = this.data[0].email;
        this.dob = this.data[0].dateOfBirth;
        this.aadhar = this.data[0].adharNumber;
        this.phone = this.data[0].phoneNumber

        this.id = respObj.data._id;
        


        //this.OrgData = 
        //this.createCandidate.patchValue(respObj.data);
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
    
  }
  


}

