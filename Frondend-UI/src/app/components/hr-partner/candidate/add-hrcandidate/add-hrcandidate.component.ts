import { Input, QueryList, ViewChildren} from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, Form, FormGroupDirective, FormArrayName } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { StorageService } from '../../../../services/storage.service';
import { from, Subscription } from 'rxjs';
import { MatTabChangeEvent,MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatDatepicker } from '@angular/material/datepicker';
import { environment } from '../../../../../environments/environment';
import { ExEmployeeService } from '../../service/ex-employee.service';

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
  candidate: FormArray;
  form: FormGroup;

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
  candidateSubscription: Subscription;
  showSave: boolean = true;
  submitValue : boolean = true;
  empIdsave : any;
  count : boolean = false;
  dis;
  isDisabled = true;
  today = new Date();
  @ViewChild('picker') picker: MatDatepicker<Date>;
  public tabGroup: MatTabGroup;
  @ViewChild(MatTabGroup, {read: MatTabGroup})
  @ViewChildren(MatTab, {read: MatTab})
  public tabNodes: QueryList<MatTab>;
  public closedTabs = [];
  
  createItem(): FormGroup{
    return this.fb.group({
        nameofFeedbackProvider: new FormControl(''), 
        designationOfFeedbackProvider: new FormControl(''), 
        employeeId: new FormControl(''),  
        dateOfJoining: new FormControl('', [Validators.required, this.validateJoiningDate()]),
        exitDate: new FormControl('', [Validators.required, this.validateJoiningDate()]),
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
        }),
      
    })
  }


  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
     public dialog: MatDialog,
     public route: ActivatedRoute,
    private el: ElementRef, private exempService: ExEmployeeService
  ) {
    this.route.params.subscribe(params => {
      this.empIdedit = params.id;
      this.empIdsave =params.id;
    });
    this.form = this.fb.group({

      // bi0: this.fb.group({
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
      pinCode: new FormControl(),
      hrorganisationId: new FormControl(),
      addedById: new FormControl(),
    // }),
      candidate: this.fb.array([ 
        this.createItem()
        ]),
          
        
      // this.form=  fb.group({
      //     candidate: new FormArray([])
      //     });
      // verification: this.fb.group({
      personalIdentity: new FormControl(''),
      criminal: new FormControl(''),
      verificationAddress: new FormControl(''),
      drugsAndSubstanceAbuse: new FormControl(''),
      salarySlipCTCdocument: new FormControl('')
    // })
    })
   }

  //  get f() { return this.form.controls; }
  //  get t() { return this.f.candidate as FormArray; }

  validateExitDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.form !== undefined) {
       
        const exitDate = this.form.controls['exitDate']?.value;
        const joiningDate = this.form.controls['dateOfJoining']?.value
        if (exitDate <= joiningDate) return { requiredToDate: true };
      }
    };
  }

  validateJoiningDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.form !== undefined) {
        const exitDate = this.form.controls['exitDate']?.value;
        const fexitDate = new Date(exitDate);
        const joiningDate = this.form.controls['dateOfJoining']?.value;
        if (fexitDate <= joiningDate) return { requiredFromDate: true };
      }
    };
  }
  maxNumberOfTabs: number;

  public tabChanged(tabChangedEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangedEvent.index;
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
   if (this.form.value.reasonForSerperation == "voluntary") {
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


  allOrganization=[]
  getAllOrganizationNames(){
    this.exempService.getAllOrganization().subscribe(resp => {
      this.allOrganization = resp.data;
      console.log(resp.data[0]._id);
    })
  }

  allIntitution =[]
  getAllIntitutionName(){
    this.exempService.getAllInstitution().subscribe(resp => {
      this.allIntitution = resp.data;
      console.log(resp.data[0]._id);
    })
  }
  tabs =[""];// ["organization"];
  ngOnInit(): void {
   this.getAllOrganizationNames();
   this.editEmployeeSubscription = this.exempService.editEmployee(this.empIdedit).subscribe(respObj => {
    // console.log(respObj.data);
   this.form.patchValue(respObj.data);
   this.tabs = respObj.data.candidate;
    // this.tabs[0] = respObj.data.candidate[0];
    // this.tabs[1] = respObj.data.candidate[1];
    // console.log(respObj.data.candidate[1].nameofFeedbackProvider)
    // this.form.value.candidate.push(this.tabs[1])
    // console.log(this.form.value.candidate);
    // this.form.patchValue(respObj.data.candidate[1]);
    this.form.setValue(respObj.data.candidate[1].nameofFeedbackProvider);
    this.form.value.candidate[0].patchValue({nameofprovider:respObj.data.candidate[0].nameofprovider});
    // this.tabs = respObj.data.candidate;
    // var candidate = []
    // for(var i=0 ; i < respObj.data.candidate.length;i++){
    //   for(var j =0 ; j< this.form.value.candidate.length;j++){
    //     if(respObj.data.candidate[i].nameofFeedbackProvider == this.form.value.candidate[j].nameofFeedbackProvider){
    //       var obj1 = { 
    //   nameofFeedbackProvider:this.form.value.candidate[j].nameofFeedbackProvider,
    //          }
    //       candidate.push(obj1);
    //         }
    //   }
    //   j=0;
    // }
  //   var data = {
  //     candidate
  //  };
   
    // this.form.patchValue(data);
   })
    }

   
  tabtitle:string = '';
  
  Insttabs = [];

  selected = new FormControl(0);
  
  addTab(selectAfterAdding: boolean) {
    console.log(selectAfterAdding)
    this.tabs.push('organization');
    // this.selected.setValue(this.tabs.length + 1);
    // this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];

    this.candidate = this.form.get('candidate') as FormArray;
    this.candidate.push(this.createItem());
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }

  }
  removeTab(i :number) {
    this.tabs.splice(i, 1);
  }
  removeTabs(index :number) {
    this.tabs.splice(index, 1);
  }
  // closeTab(index: number) {
  //   event.stopPropagation();
  //   this.closedTabs.push(index);
  //   this.tabGroup.selectedIndex = this.tabNodes.length - 1;
  // }
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

  showTab= false;
  showSecondTab(selectAfterAdding: boolean){
    this.showTab = true;
    this.Insttabs.push(selectAfterAdding);
    // this.tabGroup.selectedIndex = this.Insttabs.length - 1;
  }
  // close() {

  // }
  
  calculateExperience() {
    var fromDate = this.form.value.dateOfJoining;
    console.log(fromDate)
    var toDate = this.form.value.exitDate;

    try {
      console.log("try block")
      console.log(toDate);
      var result = this.getDateDifference(new Date(fromDate), new Date(toDate));

      if (result && !isNaN(result.years)) {
        this.form.patchValue({
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
    if (this.form.value.firstName, this.form.value.lastName) {
      return ' - ' + this.form.value.firstName + ' ' + this.form.value.lastName;
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
    methodtype;
    openDialog() {
      const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      });
      dialogRef.componentInstance.methodType = this.methodtype;
    } 
  submit() {
      this.candidateSubscription = this.exempService.addcandidate(
      this.form.value
     
      ).subscribe(resp => {
        this.openDialog();
      }, err => {
        this.setMessage = { message: err.error.message, error: true };
        this.error = this.setMessage.message;
        throw this.setMessage.message;
      })
    }
  




  update(id: number) {
 
}
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html'
})
export class DialogElementsExampleDialog {
  @Input() methodType: any
  Message: any;
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>, private router: Router
  ) {
    console.log(this.methodType)
  }

  ngOnInit() {
    console.log(this.methodType)
    if (this.methodType == 'update') {
      this.Message = "Ex-Employee  Updated successfully"
    } else if(this.methodType == 'save') {
      this.Message = "Ex-Employee Feedback successfully Submitted"
    } else if(this.methodType == 'duplicate') {
      this.Message = "Ex-Employee with same email exists"
    }
     else {
      this.Message ="Candidate added successfully"
    }
    
  }

  close() {
    this.dialogRef.close(true);
    this.router.navigate(['/hrcandidate-list']);
  }
}