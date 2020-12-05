import { Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, Form, FormGroupDirective } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { StorageService } from '../../../../services/storage.service';
import { from, Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { environment } from '../../../../../environments/environment';
import { fromEvent } from "rxjs";
import { debounceTime, take } from "rxjs/operators";
import { ConnectedPositionStrategy } from '@angular/cdk/overlay';
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
  providers: [EmployeeService, StorageService]
})
export class AddCandidateComponent implements OnInit {
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
  public setMessage: any = {};
  error = '';
  empIdedit: any;
  id;
  empIdupdate: number;
  termination: string;
  showCase: string;
  suspention: string;
  discrepancy: string;
  compliance: string;
  warning: string;
  organizationName: any = window.sessionStorage.getItem('orgName');
  selectedIndex: number = 0;
  tabChangeEvent: any;
  fileToUpload: File;
  documentName: any;
  studentDocSubscription: any;
  stuService: any;
  studentForm: any;
  baseUrl: any = environment.baseUrl;
  awardActivities: boolean = false;
  reasonsForSeparation: boolean = false;

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef, public dialog: MatDialog, public route: ActivatedRoute, public empService: EmployeeService,
    private el: ElementRef
  ) {
    this.route.params.subscribe(params => {
      this.empIdedit = params.id;
    });

    this.firstFormGroup = new FormGroup({
      _id: new FormControl(),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      employeeId: new FormControl(''),
      adharNumber: new FormControl(''),
      panNumber: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', []),
      dateOfJoining: new FormControl('', [Validators.required, this.validateJoiningDate()]),
      exitDate: new FormControl('', [Validators.required, this.validateExitDate()]),
      organizationName: new FormControl(this.organizationName),
      professionalExperience: new FormControl(''),
      reasonForSerperation: new FormGroup({ IsSelect: new FormControl('voluntary'), voluntaryReason: new FormControl(), inVoluntaryReason: new FormControl()}),
      role: new FormControl(''),
      department: new FormControl(''),
      address: new FormControl(''),
      landMark: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zipCode: new FormControl()
    });
    this.secondFormGroup = new FormGroup({
      selfDriven: new FormControl('', [Validators.required]),
      creativity: new FormControl('', [Validators.required]),
      // informalOrganizationSenseOfBelonging: new FormControl('', [Validators.required]),
      // initiative: new FormControl('', [Validators.required]),
      workIndependenty: new FormControl('', [Validators.required]),
      teamWork: new FormControl('', [Validators.required]),
      dealConstructivelyWithPressure: new FormControl('', [Validators.required]),
      // punctuality: new FormControl('', [Validators.required]),
      discipline: new FormControl('', [Validators.required])
    });
    this.thirdFormGroup = new FormGroup({
      academicKnowledge: new FormControl('', [Validators.required]),
      productKnowledge: new FormControl('', [Validators.required]),
      industryKnowledge: new FormControl('', [Validators.required]),
      communicationSkills: new FormControl('', [Validators.required]),
      rehireAgain: new FormControl(''),
      keySkills: new FormControl('')
    });
    this.fourthFormGroup = new FormGroup({
      awards: new FormGroup({
        IsSelect: new FormControl(), remarks: new FormControl(),
        documentName: new FormControl(),documentUpload: new FormControl()
        
      })
    });
    this.fifthFormGroup = new FormGroup({
      // volume: new FormControl('', [Validators.required]),
      quality: new FormGroup({ IsSelect: new FormControl(''), description: new FormControl('') }),
      consistency: new FormGroup({ IsSelect: new FormControl(''), description: new FormControl('') }),
      building: new FormGroup({ IsSelect: new FormControl(''), description: new FormControl('') }),
      stakeholder: new FormGroup({ IsSelect: new FormControl(''), description: new FormControl('') })
    });
    this.sixthFormGroup = new FormGroup({
      discrepancyDocuments: new FormGroup({
        IsSelect: new FormControl(false), period: new FormControl(''),
        causeActionTaken: new FormControl(''), uploadDocument: new FormControl('')
      }),
      compliencyDiscrepancy: new FormGroup({
        IsSelect: new FormControl(false), period: new FormControl(''),
        causeActionTaken: new FormControl(''), uploadDocument: new FormControl('')
      }),
      warning: new FormGroup({
        IsSelect: new FormControl(false), period: new FormControl(''),
        causeActionTaken: new FormControl(''), uploadDocument: new FormControl('')
      }),
      showCausedIssue: new FormGroup({
        IsSelect: new FormControl(false), period: new FormControl(''),
        causeActionTaken: new FormControl(''), uploadDocument: new FormControl('')
      }),
      suspension: new FormGroup({
        IsSelect: new FormControl(false), period: new FormControl(''),
        causeActionTaken: new FormControl(''), uploadDocument: new FormControl('')
      }),
      termination: new FormGroup({
        IsSelect: new FormControl(false), period: new FormControl(''),
        causeActionTaken: new FormControl(''), uploadDocument: new FormControl('')
      }),
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
  methodtype;
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    });
    dialogRef.componentInstance.methodType = this.methodtype;
  }

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

  uploadawardsFile(file: FileList,type) {
    this.fileToUpload = file[0];
    this.documentName = this.fileToUpload.name;
    this.studentDocSubscription = this.stuService.postFile(this.fileToUpload).subscribe(
      data => {
        this.studentForm.patchValue({ awards: data.data.documentUpload });
        console.log(data.data.documentUpload);

        this.documentName = `${this.baseUrl}/public/student_doc/${data.data.documentUpload}`;
        // this.studentDocSubscription = this.stuService.deleteFile(this.imageFilename).subscribe();
      }
    )
  }

  uploadIssuesFile(file: FileList, type) {
    this.fileToUpload = file[0];
    this.documentName = this.fileToUpload.name;
    this.studentDocSubscription = this.empService.postIssuesFile(this.fileToUpload).subscribe(
      data => {
        if (type == 'discrepancyDocuments') {
          this.sixthFormGroup.patchValue({ discrepancyDocuments: { uploadDocument: data.data.documentLink } });
        }
        if (type == 'compliencyDiscrepancy') {
          this.sixthFormGroup.patchValue({ compliencyDiscrepancy: { uploadDocument: data.data.documentLink } });
        }
        if (type == 'Warning') {
          this.sixthFormGroup.patchValue({ warning: { uploadDocument: data.data.documentLink } });
        }
        if (type == 'showCausedIssue') {
          this.sixthFormGroup.patchValue({ showCausedIssue: { uploadDocument: data.data.documentLink } });
        }
        if (type == 'suspension') {
          this.sixthFormGroup.patchValue({ suspension: { uploadDocument: data.data.documentLink } });
        }
        if (type == 'termination') {
          this.sixthFormGroup.patchValue({ termination: { uploadDocument: data.data.documentLink } });
        }
        this.documentName = `${this.baseUrl}/public/organizationIssues/${data.data.documentLink}`;
        // this.studentDocSubscription = this.stuService.deleteFile(this.imageFilename).subscribe();
      }
    )
    console.log('tesssting' + this.documentName)
  }

  ngOnInit(): void {
    if (this.empIdedit) {
      this.editEmployeeSubscription = this.empService.editEmployee(this.empIdedit).subscribe(respObj => {
        console.log(respObj.data);
        this.id = respObj.data._id;
        // if (respObj.data.uploadDocument == "1") {
          
        // }
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

    try {
      console.log("try block")
      console.log(toDate);
      var result = this.getDateDifference(new Date(fromDate), new Date(toDate));

      if (result && !isNaN(result.years)) {
        this.firstFormGroup.patchValue({
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
    if (this.firstFormGroup.value.firstName) {
      return ' - ' + this.firstFormGroup.value.firstName + ' Information';
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

  submit() {
    if (this.firstFormGroup.invalid) {
      this.firstFormGroup.markAllAsTouched();
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 0;
        return;
      }
    }
    if (this.secondFormGroup.invalid) {
      this.secondFormGroup.markAllAsTouched();
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 1;
        return;
      }
    }
    if (this.thirdFormGroup.invalid) {
      this.thirdFormGroup.markAllAsTouched();
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 2;
        return;
      }
    }
    if (this.fourthFormGroup.invalid) {
      this.fourthFormGroup.markAllAsTouched();
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 3;
        return;
      }
    }
    if (this.fifthFormGroup.invalid) {
      this.fifthFormGroup.markAllAsTouched();
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 4;
        return;
      }
    }
    if (this.sixthFormGroup.invalid) {
      this.sixthFormGroup.markAllAsTouched();
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 5;
        return;
      }
    }
    if (!this.empIdedit) {
      this.employeeSubscription = this.empService.addEmployee({
        ...this.firstFormGroup.value, ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value, ...this.fourthFormGroup.value, ...this.fifthFormGroup.value,
        ...this.sixthFormGroup.value
      })
        .subscribe(resp => {
          // console.log(this.createCandidate.value);
          this.openDialog();
        }, err => {
          this.setMessage = { message: err.error.message, error: true };
          this.error = this.setMessage.message;
          throw this.setMessage.message;
        })
    }
  }


  

  update(id: number) {
    this.empIdupdate = id;
    this.employeeUpdateSubscription = this.empService.updateEmployee({
      ...this.firstFormGroup.value, ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value, ...this.fourthFormGroup.value, ...this.fifthFormGroup.value,
      ...this.sixthFormGroup.value
    }).subscribe(resp => {
      this.methodtype = "update";
      this.openDialog();
    }, err => {
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    })
  }

  downloadDoc(docLink) {
    if (docLink != '') {
      const temp = `${this.baseUrl}/public/organizationIssues/${docLink}`;
      window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
    }
  }
}



@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
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
      this.Message = "Employee  Updated successfully"
    } else {
      this.Message = "Employee Onboarded successfully"

    }
  }

  close() {
    this.dialogRef.close(true);
    this.router.navigate(['/candidate-list']);
  }
}
