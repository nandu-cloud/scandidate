import { Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployeeService } from  '../../services/employee.service';
import { StorageService } from '../../services/storage.service';
import { from, Subscription } from 'rxjs';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'bgv-view',
  templateUrl: './bgv-view.component.html',
  styleUrls: ['./bgv-view.component.css'],
  providers: [EmployeeService,StorageService]
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
  empIdupdate: number;
  termination: string;
  showCase : string;
  suspention : string;
  discrepancy: string;
  compliance : string;
  warning : string;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,public route:ActivatedRoute,public empService : EmployeeService
  ) {
    this.route.params.subscribe(params => {
      this.empIdedit = params.id;
  });
    this.createCandidate = new FormGroup({
      _id: new FormControl(), 
      firstName: new FormControl('', [Validators.required,Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required,Validators.minLength(3)]),
      employeeId : new FormControl(''),
      phoneNumber : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      role: new FormControl(''),
      department: new FormControl(''),
      address : new FormControl(''),
      dateOfJoining : new FormControl('',[Validators.required,this.validateJoiningDate()]),
      exitDate : new FormControl('',[Validators.required,this.validateExitDate()]),
      punctuality: new FormControl('', [Validators.required]),
      discipline: new FormControl('', [Validators.required]),
      dateOfBirth : new FormControl(''),
      academicKnowledge : new FormControl('',[Validators.required]),
      productKnowledge : new FormControl('',[Validators.required]),
      industryKnowledge : new FormControl('',[Validators.required]),
      communicationSkills : new FormControl('',[Validators.required]),
      adharNumber : new FormControl(''),
      panNumber : new FormControl(''),
      professionalExperience : new FormControl('',[Validators.required,Validators.maxLength(2)]),
      selfDriven : new FormControl('',[Validators.required]),
      creativity : new FormControl('',[Validators.required]),
      informalOrganizationSenseOfBelonging : new FormControl('',[Validators.required]),
      initiative : new FormControl('',[Validators.required]),
      workIndependenty : new FormControl('',[Validators.required]),
      teamWork: new FormControl('', [Validators.required]),
      dealConstructivelyWithPressure: new FormControl('', [Validators.required]),
      volume: new FormControl('', [Validators.required]),
      quality: new FormControl('', [Validators.required]),
      consistency: new FormControl('', [Validators.required]),
      awards: new FormControl('', [Validators.required]),
      discrepancy: new FormControl(''),
      compliance: new FormControl(''),
      warning : new FormControl(''),
      showcaseissued : new FormControl(''),
      suspention : new FormControl(''),
      termination : new FormControl('')

    });
  }
  validateExitDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.createCandidate !== undefined) {
        //const arrivalDate = control.value;
        const exitDate = this.createCandidate.controls['exitDate'].value;
        const joiningDate = this.createCandidate.controls['dateOfJoining'].value
        if (exitDate <= joiningDate) return { requiredToDate: true };
      }
    };
  }

  validateJoiningDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.createCandidate !== undefined) {
        const exitDate = this.createCandidate.controls['exitDate'].value;
        const fexitDate = new Date(exitDate);
        const joiningDate = this.createCandidate.controls['dateOfJoining'].value;
        if (fexitDate <= joiningDate) return { requiredFromDate: true };
      }
    };
  }
  close(){
    setTimeout(() => {
      this.error='';
     }, 100);
    //  this.loginForm.reset();
  }
  registrationForm = this.fb.group({
    file: [null]
  })  
  methodtype;
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog,{
  });
    dialogRef.componentInstance.methodType = this.methodtype;
  }

  ngOnInit(): void {
    if(this.empIdedit){
      this.editEmployeeSubscription = this.empService.editEmployee(this.empIdedit).subscribe(respObj => {
        console.log(respObj.data);
        this.id = respObj.data._id;
        this.createCandidate.patchValue(respObj.data);
        // this.imageUrl=`${this.baseUrl}/public/organization_logo/${respObj.data.organisationLogo}`;
        // this.imageFilename=respObj.data.organisationLogo;
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
  }
  submit(){
    if(!this.empIdedit){
    this.employeeSubscription = this.empService.addEmployee(this.createCandidate.value).subscribe(resp =>{
      console.log(this.createCandidate.value);
      this.openDialog();
    }, err =>{
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    })
  }
}
uploadFile(){

}
update(id:number){
  this.empIdupdate = id;
  this.employeeUpdateSubscription = this.empService.updateEmployee(this.createCandidate.value).subscribe(resp =>{
    this.methodtype="update";
    this.openDialog();
  }, err =>{
    this.setMessage = { message: err.error.message, error: true };
    this.error = this.setMessage.message;
    throw this.setMessage.message;
  })
}
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
})
export class DialogElementsExampleDialog {
  @Input() methodType: any
  Message: any;
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,private router:Router
    ) {
      console.log(this.methodType)
    }

    ngOnInit(){
      console.log(this.methodType)
      if(this.methodType == 'update'){
        this.Message="Employee  Updated successfully"
      }else{
        this.Message="Employee Onboarded successfully"

      }
    }

  close(){
    this.dialogRef.close(true);
    this.router.navigate(['/candidate-list']);
 }
 
}