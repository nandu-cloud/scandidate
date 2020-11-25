import { Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployeeService } from  '../../../../services/employee.service';
import { StorageService } from '../../../../services/storage.service';
import { from, Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { fromEvent } from "rxjs";
import { debounceTime, take } from "rxjs/operators";
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
  providers: [EmployeeService,StorageService]
})
export class AddCandidateComponent implements OnInit {
  createCandidate: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  
  employeeSubscription : Subscription;
  editEmployeeSubscription : Subscription;
  employeeUpdateSubscription: Subscription;
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
  organizationName: any = window.sessionStorage.getItem('orgName');
  selectedIndex: number = 0;
  tabChangeEvent: any;
 
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,public route:ActivatedRoute,public empService : EmployeeService,
     private el: ElementRef
  ) {
    this.route.params.subscribe(params => {
      this.empIdedit = params.id;
  });

    this.firstFormGroup = new FormGroup({
      _id: new FormControl(),
      firstName: new FormControl('', [Validators.required,Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required,Validators.minLength(3)]),
      employeeId : new FormControl(''),
      adharNumber : new FormControl(''),
      panNumber : new FormControl(''),
      phoneNumber : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
      email: new FormControl('', [Validators.required,Validators.email]),
      dateOfBirth : new FormControl('',[]),
      dateOfJoining : new FormControl('',[Validators.required,this.validateJoiningDate()]),
      exitDate : new FormControl('',[Validators.required,this.validateExitDate()]),
      organizationName : new FormControl(this.organizationName),
      professionalExperience : new FormControl(''),
      role: new FormControl(''),
      department: new FormControl(''),
      address : new FormControl(''),
      landMark : new FormControl(),
      city : new FormControl(),
      state : new FormControl(),
      zipCode : new FormControl(),
      awards: new FormControl('')
    });
    this.secondFormGroup = new FormGroup({
      selfDriven : new FormControl('',[Validators.required]),
      creativity : new FormControl('',[Validators.required]),
      informalOrganizationSenseOfBelonging : new FormControl('',[Validators.required]),
      initiative : new FormControl('',[Validators.required]),
      workIndependenty : new FormControl('',[Validators.required]),
      teamWork: new FormControl('', [Validators.required]),
      dealConstructivelyWithPressure: new FormControl('', [Validators.required]),
      punctuality: new FormControl('', [Validators.required]),
      discipline: new FormControl('', [Validators.required])
    });
    this.fourthFormGroup = new FormGroup({
      volume: new FormControl('', [Validators.required]),
      quality: new FormControl('', [Validators.required]),
      consistency: new FormControl('', [Validators.required]),
      building: new FormControl(),
      stakeholder : new FormControl()
    });
    this.thirdFormGroup = new FormGroup({
      academicKnowledge : new FormControl('',[Validators.required]),
      productKnowledge : new FormControl('',[Validators.required]),
      industryKnowledge : new FormControl('',[Validators.required]),
      communicationSkills : new FormControl('',[Validators.required])
    });
    this.fifthFormGroup = new FormGroup({
      discrepancy: new FormControl(''),
      compliance: new FormControl(''),
      warning : new FormControl(''),
      showcaseissued : new FormControl(''),
      suspention : new FormControl(''),
      termination : new FormControl(''),
      description : new FormControl()
    });
  }
 
  validateExitDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.firstFormGroup !== undefined) {
        //const arrivalDate = control.value;
        const exitDate = this.firstFormGroup.controls['exitDate'].value;
        const joiningDate = this.firstFormGroup.controls['dateOfJoining'].value
        if (exitDate <= joiningDate) return { requiredToDate: true };
      }
    };
  }

  validateJoiningDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.firstFormGroup !== undefined) {
        const exitDate = this.firstFormGroup.controls['exitDate'].value;
        const fexitDate = new Date(exitDate);
        const joiningDate = this.firstFormGroup.controls['dateOfJoining'].value;
        if (fexitDate <= joiningDate) return { requiredFromDate: true };
      }
    };
  }
  maxNumberOfTabs: number;
  
  public tabChanged(tabChangedEvent: MatTabChangeEvent): void {
    this.selectedIndex = this.tabChangeEvent.index;
  }
  public nextStep() {
    if (this.firstFormGroup.valid){
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 1
      }
    }
    if (this.secondFormGroup.valid){
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 2
      }
    }
    if (this.thirdFormGroup.valid){
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 3
      }
    }
    if (this.fourthFormGroup.valid){
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 4
      }
    }
    console.log(this.selectedIndex);
  }


  public cancel() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
    console.log(this.selectedIndex);
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
        this.firstFormGroup.patchValue(respObj.data);
        this.secondFormGroup.patchValue(respObj.data);
        this.thirdFormGroup.patchValue(respObj.data);
        this.fourthFormGroup.patchValue(respObj.data);
        this.fifthFormGroup.patchValue(respObj.data);
        // this.imageUrl=`${this.baseUrl}/public/organization_logo/${respObj.data.organisationLogo}`;
        // this.imageFilename=respObj.data.organisationLogo;
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
  }

  calculateExperience() {
    var fromDate = this.firstFormGroup.value.dateOfJoining;
    console.log(fromDate)
    var toDate = this.firstFormGroup.value.exitDate;
    console.log(toDate);
  
    try {
      console.log("try block")
      var result = this.getDateDifference(new Date(fromDate), new Date(toDate));
  
      if (result && !isNaN(result.years)) {
        this.firstFormGroup.patchValue({ professionalExperience:
          result.years + ' year' + (result.years == 1 ? ' ' : 's ') +
          result.months + ' month' + (result.months == 1 ? ' ' : 's ') })
          //+ 'and ' +  result.days + ' day' + (result.days == 1 ? '' : 's')
      }
    } catch (e) {
      console.error(e);
    }
  }

   getDateDifference(startDate, endDate) {
    if (startDate > endDate) {
      console.error('Start date must be before end date');
      return null;
    }
    var startYear = startDate.getFullYear();
    var startMonth = startDate.getMonth();
    var startDay = startDate.getDate();
  
    var endYear = endDate.getFullYear();
    var endMonth = endDate.getMonth();
    var endDay = endDate.getDate();
  
    // We calculate February based on end year as it might be a leep year which might influence the number of days.
    var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
    var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    var startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
    var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);
  
    var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;
  
    // (12 + ...) % 12 makes sure index is always between 0 and 11
    var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;
  
    return {
      years: years,
      months: months,
      days: days
    };
  }

  submit(){
    if(!this.empIdedit){
    this.employeeSubscription = this.empService.addEmployee({...this.firstFormGroup.value, ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value, ...this.fourthFormGroup.value, ...this.fifthFormGroup.value})
    .subscribe(resp =>{
     // console.log(this.createCandidate.value);
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
  this.employeeUpdateSubscription = this.empService.updateEmployee({...this.firstFormGroup.value, ...this.secondFormGroup.value,
    ...this.thirdFormGroup.value, ...this.fourthFormGroup.value, ...this.fifthFormGroup.value}).subscribe(resp =>{
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