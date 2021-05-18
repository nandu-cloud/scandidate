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
import { fromEvent } from "rxjs";
import { debounceTime, take } from "rxjs/operators";
import { ConnectedPositionStrategy } from '@angular/cdk/overlay';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
  providers: [ EmployeeService, StorageService]
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
  organizationName: any = window.sessionStorage.getItem('orgName');
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
  today = new Date();
  @ViewChild('picker') picker: MatDatepicker<Date>;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
     public dialog: MatDialog,
     public route: ActivatedRoute,
      public empService: EmployeeService,
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
      employeeId: new FormControl(''),
      adharNumber: new FormControl('', [Validators.pattern("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")]),
      panNumber: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(''),
      dateOfJoining: new FormControl('', [Validators.required, this.validateJoiningDate()]),
      exitDate: new FormControl('', [Validators.required, this.validateExitDate()]),
      organizationName: new FormControl(this.organizationName),
      professionalExperience: new FormControl(''),
      reasonForSerperation: new FormGroup({ IsSelect: new FormControl('voluntary'), voluntaryReason: new FormControl(),
       inVoluntaryReason: new FormControl()}),
      role: new FormControl(''),
      department: new FormControl(''),
      address: new FormControl(''),
      landMark: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pinCode: new FormControl()
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
      rehireAgain: new FormControl(),
      keySkills: new FormControl(),
      empThrive: new FormControl()
    });
    this.fourthFormGroup = new FormGroup({
      awards: new FormGroup({
        IsSelect: new FormControl(), remarks: new FormControl(),
        documentName: new FormControl(), documentUpload: new FormControl(),
        originalFilename: new FormControl(this.documentName)
      })
    });
    this.fifthFormGroup = new FormGroup({
      // volume: new FormControl('', [Validators.required]),
      inLeadership : new FormControl(),
      quality: new FormGroup({ IsSelect: new FormControl(), description: new FormControl() }),
      consistency: new FormGroup({ IsSelect: new FormControl(), description: new FormControl() }),
      building: new FormGroup({ IsSelect: new FormControl(), description: new FormControl() }),
      stakeholder: new FormGroup({ IsSelect: new FormControl(), description: new FormControl() }),
      
    });
    this.sixthFormGroup = new FormGroup({
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
    });
  }
  onKeyup(event){
   
      this.duplicateSubscription = this.empService.duplicateEntry(event.target.value).subscribe(resp => {
        console.log(event.target.value);
      })
    
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

  uploadawardsFile(file: FileList) {
    this.fileToUpload = file[0];
    this.documentName = this.fileToUpload.name;
    this.studentDocSubscription =  this.empService.postIssuesFile(this.fileToUpload).subscribe(
      data => {
        this.fourthFormGroup.patchValue({ awards: { documentUpload: data.data.documentUpload } });
        this.fourthFormGroup.value.awards.originalFilename = this.documentName;
        // this.fourthFormGroup.controls.awards.setValue({documentUpload: data.data.documentUpload});
        // this.fourthFormGroup.setValue({awards: {documentUpload: data.data.documentUpload}});
        //  patchValue({ awards: { documentUpload: data.data.documentUpload } });
        console.log('testing awards' + data.data.documentUpload);
        // this.documentNameData = `${data.data.documentUpload}`;
        this.documentNameData = `${this.baseUrl}/public/organization_doc/${data.data.documentUpload}`;
        // console.log('testing awards'+ this.documentNameData);
        // this.studentDocSubscription = this.stuService.deleteFile(this.imageFilename).subscribe();
      }
    );
    // console.log(this.documentNameData + 'jkfshhhhhhhhhhhhhhhhhhhhhhhhhhh');
  }

  discrepancyFileName = '';
  compliencyFileName = '';
  warningFileName= '';
  showcausedFileName = '';
  suspensionFileName = '';
  terminationFileName = '';
  uploadIssuesFile(file: FileList, type) {
    this.fileToUpload = file[0];
    this.fileName = this.fileToUpload.name;
    this.studentDocSubscription = this.empService.postIssuesFile(this.fileToUpload).subscribe(
      data => {
        if (type == 'discrepancyDocuments') {
          this.sixthFormGroup.patchValue({ discrepancyDocuments: { descrepencyUploadDocument: data.data.documentUpload }});
          this.discrepancyFileName = data.data.originalFilename;
          // this.discrepancyDownloadFile = data.data.documentUpload;
          this.sixthFormGroup.value.discrepancyDocuments.originalFilename = this.discrepancyFileName;
          console.log('sssssssss' + this.discrepancyFileName)
        }
        if (type == 'compliencyDiscrepancy') {
          this.sixthFormGroup.patchValue({ compliencyDiscrepancy: { compliencyUploadDocument: data.data.documentUpload } });
          this.compliencyFileName = data.data.originalFilename;
          this.sixthFormGroup.value.compliencyDiscrepancy.originalFilename = this.compliencyFileName;
        }
        if (type == 'Warning') {
          this.sixthFormGroup.patchValue({ warning: { warningUploadDocument: data.data.documentUpload } });
          this.warningFileName = data.data.originalFilename;
          this.sixthFormGroup.value.warning.originalFilename = this.warningFileName;
        }
        if (type == 'showCausedIssue') {
          this.sixthFormGroup.patchValue({ showCausedIssue: { showCausedUploadDocument: data.data.documentUpload } });
          this.showcausedFileName = data.data.originalFilename;
          this.sixthFormGroup.value.showCausedIssue.originalFilename = this.showcausedFileName;
        }
        if (type == 'suspension') {
          this.sixthFormGroup.patchValue({ suspension: { suspensionUploadDocument: data.data.documentUpload } });
          this.suspensionFileName = data.data.originalFilename;
          this.sixthFormGroup.value.suspension.originalFilename = this.suspensionFileName;
        }
        if (type == 'termination') {
          this.sixthFormGroup.patchValue({ termination: { terminationUploadDocument: data.data.documentUpload } });
          this.terminationFileName = data.data.originalFilename;
          this.sixthFormGroup.value.termination.originalFilename = this.terminationFileName;
        }
        // this.documentName = `${this.baseUrl}/public/organization_doc/${data.data.documentUpload}`;
        // this.fileNameData = this.fileName;
        // this.studentDocSubscription = this.stuService.deleteFile(this.imageFilename).subscribe();
      }
    )
  }

  view(employeedocumentlink){
  // window.location.href = `${this.baseUrl}/public/organization_doc/${employeedocumentlink}`;
  this.downloadStudentSubscription = this.empService.downloadFile(employeedocumentlink).subscribe(respObj => {
    let newBlob = new Blob([respObj], {type: "application/pdf"});
    if(window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }
    const temp = `${this.baseUrl}/public/organization_doc/${employeedocumentlink}`;
      window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
    // window.URL.createObjectURL(newBlob);
    // fileSaver.saveAs(newBlob, this.documentName, this.discrepancyFileName, this.compliencyFileName,
    //                  this.warningFileName, this.suspensionFileName, this.showcausedFileName, this.terminationFileName);
    // var link = 
      // console.log(respObj.data);
    })
  }
  ngOnInit(): void {
//     if (this.empIdedit) {
//     this.editEmployeeSubscription = this.empService.editEmployee(this.empIdedit).subscribe(respObj => {
//       console.log(respObj.data);
      
//     if(sessionStorage.getItem('subRole')=='LINE MANAGER'){
//       this.logiuser ="linemanager"
//       this.firstFormGroup.disable()
//     } 
//     if(sessionStorage.getItem('subRole')=='LINE MANAGER' && respObj.data.status == true){
//       this.secondFormGroup.disable()
//    }
//   })
// }
    if(sessionStorage.getItem('subRole')=='LINE MANAGER'){
        this.firstFormGroup.disable()
      }
    if (this.empIdedit) {
      
      this.editEmployeeSubscription = this.empService.editEmployee(this.empIdedit).subscribe(respObj => {
        console.log(respObj.data);
        if(sessionStorage.getItem('subRole')=='LINE MANAGER' && respObj.data.status == true){
          this.secondFormGroup.disable()
          this.thirdFormGroup.disable()
          this.fourthFormGroup.disable()
          this.fifthFormGroup.disable()
          this.sixthFormGroup.disable()
       }
        if(respObj.data.status == true) {
          this.submitValue = false;
          this.showSave = false;
        }else {
          this.submitValue = true;
          this.showSave = true;
        }
         
        this.id = respObj.data._id;

        this.firstFormGroup.patchValue(respObj.data);
        this.secondFormGroup.patchValue(respObj.data);
        this.thirdFormGroup.patchValue(respObj.data);
        this.fourthFormGroup.patchValue(respObj.data);
        this.documentName = (((respObj.data.awards.originalFilename !== null) ||(respObj.data.awards.originalFilename !== undefined)) ?
         respObj.data.awards.originalFilename : '');
        this.fifthFormGroup.patchValue(respObj.data);
        this.sixthFormGroup.patchValue(respObj.data);
        this.discrepancyFileName = (((respObj.data.discrepancyDocuments.originalFilename !== null) ||(respObj.data.discrepancyDocuments.originalFilename !== undefined)) ? respObj.data.discrepancyDocuments.originalFilename : ''); 
        this.compliencyFileName = (((respObj.data.compliencyDiscrepancy.originalFilename !== null) ||(respObj.data.compliencyDiscrepancy.originalFilename !== undefined)) ? respObj.data.compliencyDiscrepancy.originalFilename : ''); 
        this.warningFileName = (((respObj.data.warning.originalFilename !== null) ||(respObj.data.warning.originalFilename !== undefined)) ? respObj.data.warning.originalFilename : ''); 
        this.showcausedFileName = (((respObj.data.showCausedIssue.originalFilename !== null) ||(respObj.data.showCausedIssue.originalFilename !== undefined)) ? respObj.data.showCausedIssue.originalFilename : ''); 
        this.suspensionFileName = (((respObj.data.suspension.originalFilename !== null) ||(respObj.data.suspension.originalFilename !== undefined)) ? respObj.data.suspension.originalFilename : ''); 
        this.terminationFileName = (((respObj.data.termination.originalFilename !== null) ||(respObj.data.termination.originalFilename !== undefined)) ? respObj.data.termination.originalFilename : '');
        // this.documentName = `${this.baseUrl}/public/organization_doc/${respObj.data.documentUpload}`;
        // this.documentName = `${respObj.data.documentUpload}`;
        // this.documentName = `${this.baseUrl}/public/organization_doc/${respObj.data.documentUpload}`;
        console.log('edit' + this.documentName);
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
    if (this.empIdsave) {
      this.showSave = false;
      this.editEmployeeSubscription = this.empService.saveAsEmployee(this.empIdsave).subscribe(respObj => {
        if(respObj.data.status == true) {
          this.submitValue = false;
          this.showSave = false;
        }else {
          this.submitValue = true;
          this.showSave = true;
        }
      //   if(sessionStorage.getItem('subRole')=='LINE MANAGER' && respObj.data.status == true){
      //     this.secondFormGroup.disable()
      //  }
        console.log(respObj.data);
        this.id = respObj.data._id;

        this.firstFormGroup.patchValue(respObj.data);
        this.secondFormGroup.patchValue(respObj.data);
        this.thirdFormGroup.patchValue(respObj.data);
        this.fourthFormGroup.patchValue(respObj.data);
        this.documentName = (((respObj.data.awards.originalFilename !== null) ||(respObj.data.awards.originalFilename !== undefined)) ?
         respObj.data.awards.originalFilename : '');
        this.fifthFormGroup.patchValue(respObj.data);
        this.sixthFormGroup.patchValue(respObj.data);
        this.discrepancyFileName = (((respObj.data.discrepancyDocuments.originalFilename !== null) ||(respObj.data.discrepancyDocuments.originalFilename !== undefined)) ? respObj.data.discrepancyDocuments.originalFilename : ''); 
        this.compliencyFileName = (((respObj.data.compliencyDiscrepancy.originalFilename !== null) ||(respObj.data.compliencyDiscrepancy.originalFilename !== undefined)) ? respObj.data.compliencyDiscrepancy.originalFilename : ''); 
        this.warningFileName = (((respObj.data.warning.originalFilename !== null) ||(respObj.data.warning.originalFilename !== undefined)) ? respObj.data.warning.originalFilename : ''); 
        this.showcausedFileName = (((respObj.data.showCausedIssue.originalFilename !== null) ||(respObj.data.showCausedIssue.originalFilename !== undefined)) ? respObj.data.showCausedIssue.originalFilename : ''); 
        this.suspensionFileName = (((respObj.data.suspension.originalFilename !== null) ||(respObj.data.suspension.originalFilename !== undefined)) ? respObj.data.suspension.originalFilename : ''); 
        this.terminationFileName = (((respObj.data.termination.originalFilename !== null) ||(respObj.data.termination.originalFilename !== undefined)) ? respObj.data.termination.originalFilename : '');
        // this.documentName = `${this.baseUrl}/public/organization_doc/${respObj.data.documentUpload}`;
        // this.documentName = `${respObj.data.documentUpload}`;
        // this.documentName = `${this.baseUrl}/public/organization_doc/${respObj.data.documentUpload}`;
        console.log('edit' + this.documentName);
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
    if(!this.empIdedit){
      var ageControl = this.firstFormGroup.get('email');
      if(ageControl.status == "INVALID"){
        // this.dis = true;
        return;
      }else{
      this.dis = false;
      }
    }
    if(sessionStorage.getItem('subRole')=='LINE MANAGER') {
      this.count = true;
      this.savenowSubscription = this.empService.savenowEmployee({
        ...this.firstFormGroup.value, ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value, ...this.fourthFormGroup.value, ...this.fifthFormGroup.value,
        ...this.sixthFormGroup.value
      })
        .subscribe(resp => {
          // console.log(this.createCandidate.value);
          this.methodtype = 'save';
          this.openDialog();
        }, err => {
          this.setMessage = { message: err.error.message, error: true };
          this.error = this.setMessage.message;
          throw this.setMessage.message;
        })
    }
    if(this.firstFormGroup.valid){
    this.count = true;
      this.savenowSubscription = this.empService.savenowEmployee({
        ...this.firstFormGroup.value, ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value, ...this.fourthFormGroup.value, ...this.fifthFormGroup.value,
        ...this.sixthFormGroup.value
      })
        .subscribe(resp => {
          // console.log(this.createCandidate.value);
          this.methodtype = 'save';
          this.openDialog();
        }, err => {
          this.setMessage = { message: err.error.message, error: true };
          this.error = this.setMessage.message;
          throw this.setMessage.message;
        })
      }else{
       
      }
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
  




  update(id: number) {
    if(sessionStorage.getItem('subRole')=='LINE MANAGER'){
      // this.getLinemanagerEmployeeData(sessionStorage.getItem('ID'))
      this.logiuser ="linemanager"
    }else if(sessionStorage.getItem('subRole')=='OPERATIONAL_USER'){
      this.logiuser = "admin"
    
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
}
  // discrepancyDownloadFile = this.data.discrepancyDocuments.descrepencyUploadDocument;;
  // discrepancyDownload(employeedocumentlink) {
  //   if ((this.sixthFormGroup.value.discrepancyDocuments.descrepencyUploadDocument !== null) || (this.sixthFormGroup.value.discrepancyDocuments.descrepencyUploadDocument === undefined)) {
  //         this.sixthFormGroup.value.discrepancyDocuments.descrepencyUploadDocument 
  //        }
  //   this.downloadStudentSubscription = this.empService.downloadFile(employeedocumentlink).subscribe(respObj => {
  //     this.data1 = respObj.data;
  //     console.log(respObj.data);

  //       });
    // if (this.discrepancyDownloadFile != '') {
    //   const temp = `${this.baseUrl}/public/organization_doc/${employeedocumentlink}`;
    //   window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
    // }
  // }

  // compliencyDownload(employeedocumentlink){
  //   if (this.compliencyDocFileName != '') {
  //     const temp = `${this.baseUrl}/public/organization_doc/${employeedocumentlink}`;
  //     window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  //   }
  // }

  // warningDownload(employeedocumentlink){
  //   if (this.warningFileName != '') {
  //     const temp = `${this.baseUrl}/public/organization_doc/${employeedocumentlink}`;
  //     window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  //   }
  // }

  // showcausedDownload(employeedocumentlink){
  //   if (this.showcausedFileName != '') {
  //     const temp = `${this.baseUrl}/public/organization_doc/${employeedocumentlink}`;
  //     window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  //   }
  // }

  // suspensionDownload(employeedocumentlink){
  //   if (this.suspensionFileName != '') {
  //     const temp = `${this.baseUrl}/public/organization_doc/${employeedocumentlink}`;
  //     window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  //   }
  // }

  // terminationDownload(employeedocumentlink){
  //   if (this.terminationFileName != '') {
  //     const temp = `${this.baseUrl}/public/organization_doc/${employeedocumentlink}`;
  //     window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  //   }
  // }

  // awardsDownload(employeedocumentlink){
  //   if (this.documentName != '') {
  //     const temp = `${this.baseUrl}/public/organization_doc/${employeedocumentlink}`;
  //     window.open(temp, "_blank", "scrollbars=yes,resizable=yes,top=800,left=800,width=800,height=800");
  //   }
  // }
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
      this.Message = "Ex-Employee  Updated successfully"
    } else if(this.methodType == 'save') {
      this.Message = "Ex-Employee Feedback successfully Submitted"
    }
     else {
      this.Message ="Ex-Employee Onboared successfully"
    }
  }

  close() {
    this.dialogRef.close(true);
    this.router.navigate(['/candidate-list']);
  }
}
