import { Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, Form, FormGroupDirective } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { StorageService } from '../../../../services/storage.service';
import { from, Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDatepicker } from '@angular/material/datepicker';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-add-hrcandidate',
  templateUrl: './add-hrcandidate.component.html',
  styleUrls: ['./add-hrcandidate.component.css']
})
export class AddHrcandidateComponent implements OnInit {
  createCandidate: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;

  employeeSubscription: Subscription;
  editEmployeeSubscription: Subscription;
  employeeUpdateSubscription: Subscription;
  downloadStudentSubscription: Subscription;
  public setMessage: any = {};
  error = '';
  empIdedit: any;
  id;
  logiuser: any;
  empIdupdate: number;
  termination: string;
  showCase: string;
  suspention: string;
  discrepancy: string;
  compliance: string;
  warning: string;
  // organizationName: any = window.sessionStorage.getItem('orgName');
  organizationName: string;
  selectedIndex: number = 0;
  tabChangeEvent: any;
  fileToUpload: File;
  documentName: any;
  fileName: any;
  fileNameData: string;
  documentNameData: string;
  studentDocSubscription: any;
  stuService: any;
  studentForm: any;
  baseUrl: any = environment.baseUrl;
  awardActivities: boolean = false;
  reasonsForSeparation: boolean = false;
  minDate : any;
  maxDate : any;
  savenowSubscription: Subscription;
  duplicateSubscription: Subscription;
  showSave: boolean = true;
  submitValue : boolean = true;
  empIdsave : any;
  count : boolean = false;
  dis;
  isDisabled = true;
  today = new Date();
  @ViewChild('picker') picker: MatDatepicker<Date>;


  
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
     public dialog: MatDialog,
     public route: ActivatedRoute,
    private el: ElementRef
  ) {
    this.route.params.subscribe(params => {
      this.empIdedit = params.id;
      this.empIdsave =params.id;
    });
    this.firstFormGroup = new FormGroup({
      _id: new FormControl(),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      
      adharNumber: new FormControl('', [Validators.pattern("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")]),
      panNumber: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(''),

      address: new FormControl(''),
      landMark: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pinCode: new FormControl()
    });
    this.secondFormGroup = new FormGroup({
      nameofFeedbackProvider: new FormControl(''), 
      designationOfFeedbackProvider: new FormControl(''), 
      employeeId: new FormControl(''),  
      dateOfJoining: new FormControl('', [Validators.required, this.validateJoiningDate()]),
      exitDate: new FormControl('', [Validators.required, this.validateExitDate()]),
      organizationName: new FormControl(''),
      role: new FormControl(''),
      professionalExperience: new FormControl(''),
      reasonForSerperation: new FormGroup({ IsSelect: new FormControl('voluntary'), voluntaryReason: new FormControl(),
       inVoluntaryReason: new FormControl()}),
      department: new FormControl(''),

      selfDriven: new FormControl('', [Validators.required]),
      creativity: new FormControl('', [Validators.required]),
      workIndependenty: new FormControl('', [Validators.required]),
      teamWork: new FormControl('', [Validators.required]),
      dealConstructivelyWithPressure: new FormControl('', [Validators.required]),
      discipline: new FormControl('', [Validators.required]),

      academicKnowledge: new FormControl('', [Validators.required]),
      productKnowledge: new FormControl('', [Validators.required]),
      industryKnowledge: new FormControl('', [Validators.required]),
      communicationSkills: new FormControl('', [Validators.required]),
      rehireAgain: new FormControl(),
      keySkills: new FormControl(),
      empThrive: new FormControl(),

      awards: new FormGroup({
        IsSelect: new FormControl(), remarks: new FormControl(),
        documentName: new FormControl(), documentUpload: new FormControl(),
        originalFilename: new FormControl(this.documentName)
      }),

      inLeadership : new FormControl(),
      quality: new FormGroup({ IsSelect: new FormControl(), description: new FormControl() }),
      consistency: new FormGroup({ IsSelect: new FormControl(), description: new FormControl() }),
      building: new FormGroup({ IsSelect: new FormControl(), description: new FormControl() }),
      stakeholder: new FormGroup({ IsSelect: new FormControl(), description: new FormControl() }),
      
      otherInfo: new FormControl(),
      discrepancyDocuments: new FormGroup({
        IsSelect: new FormControl(), descrepencyPeriod: new FormControl(),
        descrepencyCauseActionTaken: new FormControl(), descrepencyUploadDocument: new FormControl(),
        originalFilename: new FormControl(this.discrepancyFileName)
      }),
      compliencyDiscrepancy: new FormGroup({
        IsSelect: new FormControl(), compliencyPeriod: new FormControl(),
        compliencyCauseActionTaken: new FormControl(), compliencyUploadDocument: new FormControl(),
        originalFilename: new FormControl(this.compliencyFileName)
      }),
      warning: new FormGroup({
        IsSelect: new FormControl(), warningPeriod: new FormControl(),
        warningCauseActionTaken: new FormControl(), warningUploadDocument: new FormControl(),
        originalFilename: new FormControl(this.warningFileName)
      }),
      showCausedIssue: new FormGroup({
        IsSelect: new FormControl(), showCausedPeriod: new FormControl(),
        showCausedCauseActionTaken: new FormControl(), showCausedUploadDocument: new FormControl(),
        originalFilename: new FormControl(this.showcausedFileName)
      }),
      suspension: new FormGroup({
        IsSelect: new FormControl(), suspensionPeriod: new FormControl(),
        suspensionCauseActionTaken: new FormControl(), suspensionUploadDocument: new FormControl(),
        originalFilename: new FormControl(this.suspensionFileName)
      }),
      termination: new FormGroup({
        IsSelect: new FormControl(), terminationPeriod: new FormControl(),
        terminationCauseActionTaken: new FormControl(), terminationUploadDocument: new FormControl(),
        originalFilename: new FormControl(this.terminationFileName)
      })
    });
    this.thirdFormGroup = new FormGroup({
      
    })
   }

 

  validateExitDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.secondFormGroup !== undefined) {
        //const arrivalDate = control.value;
        const exitDate = this.secondFormGroup.controls['exitDate'].value;
        const joiningDate = this.secondFormGroup.controls['dateOfJoining'].value
        if (exitDate <= joiningDate) return { requiredToDate: true };
      }
    };
  }

  validateJoiningDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.secondFormGroup !== undefined) {
        const exitDate = this.secondFormGroup.controls['exitDate'].value;
        const fexitDate = new Date(exitDate);
        const joiningDate = this.secondFormGroup.controls['dateOfJoining'].value;
        if (fexitDate <= joiningDate) return { requiredFromDate: true };
      }
    };
  }
  maxNumberOfTabs: number;

  public tabChanged(tabChangedEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangedEvent.index;
  }
  public nextStep() {
    if (this.selectedIndex != this.maxNumberOfTabs) {
      this.selectedIndex ++;
    }
    console.log(this.selectedIndex);
  }


  public cancel() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
    console.log(this.selectedIndex);
  }

  close() {
    setTimeout(() => {
      this.error = '';
    }, 100);
    //  this.loginForm.reset();
  }
  registrationForm = this.fb.group({
    file: [null]
  })

  award_activities(event) {
    if (event.value == "Performer & Awarded"
      || event.value == "Non-Performer & Awarded"
      || event.value == "Performer & Not Awarded"
      || event.value == "Non-Performer & Not Awarded") {
      this.awardActivities = true;
    }
    else {
      this.awardActivities = false;
    }
  }
 
 reasons() {
   if (this.firstFormGroup.value.reasonForSerperation == "voluntary") {
     this.reasonsForSeparation = true;
   }
   else {
     this.reasonsForSeparation = false;
   }
 }


  discrepancyFileName = '';
  compliencyFileName = '';
  warningFileName= '';
  showcausedFileName = '';
  suspensionFileName = '';
  terminationFileName = '';

  ngOnInit(): void {
    }
  tabtitle:string = '';
  tabs = ["organization"];
  selected = new FormControl(0);
  // tabcount : number = 3;

  // addTab(tabs) {
  //  this.tabcount++;
  //  let comp = tabs.addDynamiTab("Tab" + this.tabcount);
  //  comp.setTitle("Tab" + this.tabcount);
  // }
//  tabs = ['First', 'Second', 'Third'];
  // selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('organization');
    // this.selected.setValue(this.tabs.length + 1);
    // this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  
  calculateExperience() {
    var fromDate = this.secondFormGroup.value.dateOfJoining;
    console.log(fromDate)
    var toDate = this.secondFormGroup.value.exitDate;

    try {
      console.log("try block")
      console.log(toDate);
      var result = this.getDateDifference(new Date(fromDate), new Date(toDate));

      if (result && !isNaN(result.years)) {
        this.secondFormGroup.patchValue({
          professionalExperience:
            result.years + ' year' + (result.years == 1 ? ' ' : 's ') +
            result.months + ' month' + (result.months == 1 ? ' ' : 's ')
        })
        //+ 'and ' +  result.days + ' day' + (result.days == 1 ? '' : 's')
      }
    } catch (e) {
      console.error(e);
    }
  }

  displayName() {
    if (this.firstFormGroup.value.firstName, this.firstFormGroup.value.lastName) {
      return ' - ' + this.firstFormGroup.value.firstName + ' ' + this.firstFormGroup.value.lastName;
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

  saveNow(){
  
    }
    
  submit() {
  
    }
  




  update(id: number) {
 
}
}
