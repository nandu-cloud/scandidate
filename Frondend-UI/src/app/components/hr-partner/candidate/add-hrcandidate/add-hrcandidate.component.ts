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
import { BehaviorSubject } from "rxjs";
import { saveAs } from 'file-saver/dist/FileSaver';

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
  canidateInstitute: FormArray;
  form: FormGroup;

  employeeSubscription: Subscription;
  editEmployeeSubscription: Subscription;
  employeeUpdateSubscription: Subscription;
  downloadStudentSubscription: Subscription;
  drugSubscription: Subscription;
  criminalSubscription: Subscription;
  salarySubscription: Subscription;
  addressSubscription: Subscription;
  searchSubscription: Subscription;
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
  documentNameData: string;va
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
  candUpdateSubscription: Subscription;
  downloadPDFSubscription: Subscription;
  searchInstSubscription: Subscription;
  searchorgSubscription: Subscription;
  verifyDocSubscription: Subscription;
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
  value; 
  candIndex: any;
  index: any;
  selectedFiles: FileList
  displaySelectedFiles:any=[];
  selectedDrugFiles: FileList
  selectedCrimialFiles: FileList
  selectedSalaryFiles: FileList
  selectedAddressFiles: FileList
  displayFiles: any = [];
  displayCriminalFiles: any = [];
  displaySalaryFiles: any = [];
  displayAddressFiles: any = [];
  files: File[] = [];
  eductionalDoc: any = [];
  drugFile: any = [];
  criminalFile: any = [];
  salaryFile: any = [];
  addressFile: any = [];
  bckverificationdocumentName: any;
  imagePreview = false;
  documentCount: any;

  PersonalIdentityDocumentUpload: '';
  PersonalIdentityFilename: '';

  documentUploadcriminal: '';
  originalFilenamecriminal: '';

  documentAddressVerification: '';
  originalFileAddressVerification: '';

  documentUploaddrugs: '';
  originalFilenamedrugs: '';

  documentUploadsalarydocument: '';
  originalFilenamesalarydocument: '';

  createItem(): FormGroup{
    return new FormGroup({ 
          _id: new FormControl(null),
          feedbackProviderName: new FormControl(''),
          feedbackProviderDesignation: new FormControl(''),
          feedbackProviderRelationship: new FormControl(''),
          feedbackProviderEmail: new FormControl(''),
          feedbackProviderPhoneNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
          employeeId: new FormControl(''),  
          dateOfJoining: new FormControl('', [Validators.required, this.validateJoiningDate()]),
          exitDate: new FormControl('', [Validators.required, this.validateJoiningDate()]),
          organizationName: new FormControl('', [Validators.required]),
          organiationLocation: new FormControl(''),
          role: new FormControl(''),
          professionalExperience: new FormControl(''),
          reasonForSerperation: new FormGroup({ IsSelect: new FormControl('voluntary'),
          voluntaryReason: new FormControl(),
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
    })
  }
  createInst(): FormGroup{
    return new FormGroup({
      _id: new FormControl(null),
      feedbackProviderName: new FormControl(''),
      feedbackProviderDesignation: new FormControl(''),
      feedbackProviderRelationship: new FormControl(''),
      feedbackProviderEmail: new FormControl(''),
      feedbackProviderPhoneNumber: new FormControl(''),  
      // nameofFeedbackProvider: new FormControl(''),
      // designationOfFeedbackProvider: new FormControl(''),
      intitutionName:new FormControl(''),
      // candidateInstituteId:new FormControl(''),
      nameOfCourse:new FormControl(''),
      yearOfJoining: new FormControl(''),
      yearOfPassout:new FormControl(''),
      studentType: new FormControl(''),
      roll:new FormControl('')
    })
  }
  formGroup = {
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
    candidate: new FormArray([]),
    canidateInstitute: new FormArray([]),
    dateOfVerification: new FormControl(),
    verifiedFor: new FormControl(),
    verifiedBy: new FormControl(),
    personalIdentity: new FormControl(),
    documentUploadPersonalIdentity: new FormControl(),
    originalFilenamePersonalIdentity: new FormControl(),
    criminal: new FormControl(),
    documentUploadcriminal: new FormControl(),
    originalFilenamecriminal: new FormControl(),
    verificationAddress: new FormControl(),
    documentUploadverificationAddress: new FormControl(),
    originalFilenameverificationAddress: new FormControl(),
    drugsAndSubstanceAbuse: new FormControl(),
    documentUploaddrugsAndSubstanceAbuse: new FormControl(),
    originalFilenamedrugsAndSubstanceAbuse: new FormControl(),
    salarySlipCTCdocument: new FormControl(),
    documentUploadsalarySlipCTCdocument: new FormControl(),
    originalFilenamesalarySlipCTCdocument: new FormControl()
  }
  candidates: FormArray
  canidateInstitutes: FormArray
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
     public dialog: MatDialog,
     public route: ActivatedRoute,
     public empService: EmployeeService,
    private el: ElementRef, private exempService: ExEmployeeService
  ) {
    this.route.params.subscribe(params => {
      this.empIdedit = params.id;
      this.empIdsave =params.id;
      // this.candIndex = params.index;
    });
   }

  //   this.verifyDocSubscription = this.empService.postIssuesFile(this.files[i]).subscribe(
  //     data => {
  //       this.form.patchValue({documentUpload: data.data.documentUpload});
  //       console.log(data.data.documentUpload);

  //       this.documentNameData = `${this.baseUrl}/public/organization_doc/${data.data.eductionalDocumentNames}`;
  //     }
  //   )

    
  // }

  uploadIssuesFile(event){
    this.fileToUpload = File[0];
    this.selectedFiles = event.target.files;
    console.log('filename' + this.fileName);
    this.files=[];
    for (let i = 0; i < event.target.files.length; i++)
    {
      
      this.files.push(this.selectedFiles[i]);
    }
    // if(this.files.length>0){
      this.displaySelectedFiles=this.files;

      console.log(this.selectedFiles)
    this.verifyDocSubscription = this.empService.postIssuesFile(this.files).subscribe(
      data => {
        // if(type == 'personalIdentity'){
          this.form.patchValue({documentUploadPersonalIdentity: data.data.documentUpload}); 
          console.log(data.data.documentUpload);
          this.PersonalIdentityDocumentUpload = data.data.documentUpload;
          this.form.patchValue({originalFilenamePersonalIdentity: data.data.originalFilenames});
          this.PersonalIdentityFilename = data.data.originalFilenames;
          this.form.value.documentUploadPersonalIdentity.originalFilenames = this.PersonalIdentityFilename;
          console.log(''+ this.PersonalIdentityFilename)
        // }
        // if(type == 'drugsAndSubstanceAbuse'){
          // this.form.patchValue({documentUploaddrugsAndSubstanceAbuse: data.data.documentUpload});
          // console.log(data.data.documentUpload);
          // this.form.patchValue({originalFilenamedrugsAndSubstanceAbuse: data.data.originalFilenames})
        // }
        // this.form.value.
        // this.documentNameData = `${this.baseUrl}/public/organization_doc/${data.data.eductionalDocumentNames}`;
        // this.imagePreview = true;
        // this.documentCount = this.displaySelectedFiles.length;
      }
    )
  // }
  }
  uploadDrugFile(event){
    this.fileToUpload = File[0];
    this.selectedDrugFiles = event.target.files;
    console.log('filename' + this.fileName);
    this.files=[];
    for (let i = 0; i < event.target.files.length; i++)
    {
      this.files.push(this.selectedDrugFiles[i]);
    }
    // if(this.files.length>0){
      this.displayFiles=this.files;
      this.drugSubscription = this.empService.postIssuesFile(this.files).subscribe(
        data => {
            this.form.patchValue( {documentUploaddrugsAndSubstanceAbuse: data.data.documentUpload});
            console.log(data.data.documentUpload);
            this.form.patchValue({originalFilenamedrugsAndSubstanceAbuse: data.data.originalFilenames})
            this.originalFilenamedrugs = data.data.originalFilenames
            this.form.value.documentUploaddrugsAndSubstanceAbuse.originalFilename = this.originalFilenamedrugs
         })
    // }
  }
  uploadCriminalFile(event){
    this.selectedCrimialFiles = event.target.files;
    this.files=[];
    for (let i = 0; i < event.target.files.length; i++)
    {
      this.files.push(this.selectedCrimialFiles[i]);
    }
    // if(this.files.length>0){
      this.displayCriminalFiles=this.files;
      this.criminalSubscription = this.empService.postIssuesFile(this.files).subscribe(
        data => {
            this.form.patchValue( {documentUploadcriminal: data.data.documentUpload});
            console.log(data.data.documentUpload);
            this.form.patchValue({originalFilenamecriminal: data.data.originalFilenames})
            this.originalFilenamecriminal = data.data.originalFilenames
            this.form.value.documentUploadcriminal.originalFilename = this.originalFilenamecriminal
         })
    // }
  }
  uploadsalaryFile(event){
    this.selectedSalaryFiles = event.target.files;
    this.files=[];
    for (let i = 0; i < event.target.files.length; i++)
    {
      this.files.push(this.selectedSalaryFiles[i]);
    }
    // if(this.files.length>0){
      this.displaySalaryFiles=this.files;
      this.salarySubscription = this.empService.postIssuesFile(this.files).subscribe(
        data => {
            this.form.patchValue( {documentUploadsalarySlipCTCdocument: data.data.documentUpload});
            console.log(data.data.documentUpload);
            this.form.patchValue({originalFilenamesalarySlipCTCdocument: data.data.originalFilenames})
            this.originalFilenamesalarydocument = data.data.originalFilenames
            this.form.value.documentUploadsalarySlipCTCdocument.originalFilename = this.originalFilenamesalarydocument
         })
  }
  uploadaddressFile(event){
    this.selectedAddressFiles = event.target.files;
    this.files=[];
    for (let i = 0; i < event.target.files.length; i++)
    {
      this.files.push(this.selectedAddressFiles[i]);
    }
    // if(this.files.length>0){
      this.displayAddressFiles=this.files;
      this.addressSubscription = this.empService.postIssuesFile(this.files).subscribe(
        data => {
            this.form.patchValue( {documentUploadverificationAddress: data.data.documentUpload});
            console.log(data.data.documentUpload);
            this.form.patchValue({originalFilenameverificationAddress: data.data.originalFilenames})
            this.documentAddressVerification = data.data.originalFilenames
            this.form.value.documentUploadverificationAddress.originalFilename = this.documentAddressVerification
         })
  }
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
  tabs: [];// ["organization"];
  cand = [];
  
  ngOnInit(): void {
   this.getAllOrganizationNames();
   this.getAllIntitutionName();
   if(this.empIdedit){
      this.editEmployeeSubscription = this.exempService.editEmployee(this.empIdedit).subscribe(respObj => {
        console.log(respObj.data);
        const { candidate: candidates } = respObj.data
        const { canidateInstitute: canidateInstitutes } = respObj.data
        this.form = this.fb.group(this.formGroup)
        this.form.patchValue(respObj.data)
        this.candidate = this.form.get('candidate') as FormArray
        // this.candidateIndex = this.form.get('candidate.index') as FormArray
        this.canidateInstitute = this.form.get('canidateInstitute') as FormArray
        // candidates.forEach(val, index){
          // this.PersonalIdentityFilename = (((respObj.data.documentUploadPersonalIdentity.originalFilename !== null)
          //  ||(respObj.data.documentUploadPersonalIdentity.originalFilename !== undefined)) ? respObj.data.documentUploadPersonalIdentity.originalFilename : ''); 

        // }
        if(respObj.data.originalFilenamePersonalIdentity){
          for(let i=0; i<respObj.data.originalFilenamePersonalIdentity.length; i++){
            const data = respObj.data.originalFilenamePersonalIdentity[i]
            this.eductionalDoc.push(data);
            console.log("orginal filename" + this.eductionalDoc);
          }
        }
        if(respObj.data.originalFilenamedrugsAndSubstanceAbuse){
          for(let i=0; i<respObj.data.originalFilenamedrugsAndSubstanceAbuse.length; i++){
            const data = respObj.data.originalFilenamedrugsAndSubstanceAbuse[i]
            this.drugFile.push(data);
            console.log("orginal filename" + this.drugFile);
          }
        }
        if(respObj.data.originalFilenamecriminal){
          for(let i=0; i<respObj.data.originalFilenamecriminal.length; i++){
            const data = respObj.data.originalFilenamecriminal[i]
            this.criminalFile.push(data);
            console.log("orginal filename" + this.criminalFile);
          }
        }
        if(respObj.data.originalFilenamesalarydocument){
          for(let i=0; i<respObj.data.originalFilenamesalarydocument.length; i++){
            const data = respObj.data.originalFilenamesalarydocument[i]
            this.salaryFile.push(data);
            console.log("orginal filename" + this.salaryFile);
          }
        }
        if(respObj.data.originalFileAddressVerification){
          for(let i=0; i<respObj.data.originalFileAddressVerification.length; i++){
            const data = respObj.data.originalFileAddressVerification[i]
            this.addressFile.push(data);
            console.log("orginal filename" + this.addressFile);
          }
        }
        this.imagePreview = true;
        this.documentNameData = `${this.baseUrl}/public/organization_doc/${respObj.data.documentUpload}`;

        if(candidates.length > 0){
          
          candidates.forEach( (can, idx) => {
            const candidateControls = this.createItem()
            candidateControls.patchValue(can)
            console.log("hiiiii", can);
            console.log("hellooooooo", idx);
            // var ind = this.idx
            this.candidate.push(candidateControls)
          })
          // var idx = candidates.indexOf(Element);
          // console.log("hellooooooo", idx);
          // function getIndex(val){
          //   for (var i = 0; i<candidates.length; i++){}
          // }
        }else{
          this.candidate.push(this.createItem())
        }

        if(canidateInstitutes || canidateInstitutes.length > 0) {
          canidateInstitutes.forEach( inst => {
             const canidateInstituteControls = this.createInst()
             canidateInstituteControls.patchValue(inst)
             this.canidateInstitute.push(canidateInstituteControls)
          })
        }
        else{
          this.canidateInstitute.push(this.createInst())
        }

        // this.id = respObj.data._id;
        // const { candidate, ...rest } = respObj.data
      //  if(respObj.data.candidate && respObj.data.candidate.length == 0){
      //   this.formGroup['candidate'] = this.createItem()
      // }else{
      //   this.form = this.fb.group(this.formGroup)
      //   this.form.patchValue(rest);
      // }
      // this.formGroup['candidate'] = this.createItem()
      // this.form = this.fb.group(this.formGroup)
      // this.form.patchValue(respObj.data);
      
      //   // this.tabs[0] = respObj.data.candidate[0];
      //   // this.tabs[1] = respObj.data.candidate[1];
      //   // console.log(respObj.data.candidate[1].nameofFeedbackProvider)
      //   // this.form.value.candidate.push(this.tabs[1])
      //   // console.log(this.form.value.candidate);
      //   // this.form.patchValue(respObj.data.candidate[1]);
      //   this.form.setValue(respObj.data.candidate[1].nameofFeedbackProvider);
      //   // this.form.candidate[0].patchValue({nameofprovider:respObj.data.candidate[0].nameofprovider});
      //   // this.tabs = respObj.data.candidate;
      //   // var candidate = []
      //   // for(var i=0 ; i < respObj.data.candidate.length;i++){
      //   //   for(var j =0 ; j< this.form.value.candidate.length;j++){
      //   //     if(respObj.data.candidate[i].nameofFeedbackProvider == this.form.value.candidate[j].nameofFeedbackProvider){
      //   //       var obj1 = { 
      //   //   nameofFeedbackProvider:this.form.value.candidate[j].nameofFeedbackProvider,
      //   //          }
      //   //       candidate.push(obj1);
      //   //         }
      //   //   }
      //   //   j=0;
      //   // }
      // //   var data = {
      // //     candidate
      // //  };
      
      //   // this.form.patchValue(data);
      })
    }else{
      
    // this.formGroup['candidate'] = this.fb.array([this.createItem()])
    this.form = this.fb.group(this.formGroup)
    this.candidate = this.form.get('candidate') as FormArray
    this.candidate.push(this.createItem())
    this.canidateInstitute = this.form.get('canidateInstitute') as FormArray
    this.canidateInstitute.push(this.createInst())
  }
    }

   
  tabtitle:string = '';
  
  Insttabs = [];

  selected = new FormControl(0);
  
  addTab(selectAfterAdding: boolean) {
    console.log(selectAfterAdding)
    // this.tabs.push('organization');
    // this.selected.setValue(this.tabs.length + 1);
    // this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
    // this.candidate = this.form.get('items') as FormArray;
    // this.candidate.push(this.createItem());
    // if (selectAfterAdding) {
    //   this.selected.setValue(this.candidate.length - 1);
    // }
    // this.candidate = this.form.get('candidate') as FormArray
    this.candidate.push(this.createItem())
    
  }
  
  
  showTab= false;
  showSecondTab(selectAfterAdding: boolean){
    this.showTab = true;
    console.log(selectAfterAdding)
    this.canidateInstitute.push(this.createInst());
    // this.tabGroup.selectedIndex = this.Insttabs.length - 1;
  }
   closeTab(c:number) {
    this.candidate.removeAt(c)
  }
  removeTabs(i:number) {

    this.canidateInstitute.removeAt(i)
  }

  // removeTab(){
  //   for (let i = 0; i < this.candidate.length; i++) {
  //     if (this.candidate[i] === this.cand) {
  //       this.cand.splice(i, 1);

  //     }
  //   }

  // }
  // public tabSub = new BehaviorSubject<cand>(this.tabs);
 // closeTab(index: number) {
    // this.tabs.splice(c, 1);
    // if (this.tabs.length > 0) {
    // this.tabs[this.tabs.length - 1].active = true;
  //   event.stopPropagation();
  //   this.closedTabs.push(index);
    // }
    // this.tabSub.next(this.tabs);
    // this.candidates.splice(index, 1);
    // if (selectAfterAdding) {
  
     // this.selected.setValue(this.candidate.length - 1);
    // }
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
  // showText = false;
  onChange(value) {
    this.value = value;
    // this.showText = true;
  }
  saveNow(){
  this.count = true;
    this.savenowSubscription = this.exempService.savenowCandidate

    (
      this.form.value
    )
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

    // idValue(i) {
    //   if(!this.indexArr[i]) { this.indexArr[i] = 0};
    //     this.indexArr[i] += 1;
    //     console.log('index:', i, ' Click number', this.indexArr[i]);
    // }
    
    downloadPDF(c){
      console.log(this.candidate.length);
      // var index = this.candidate
      var index = (this.candidate.length) - 1;
      // console.log(index)
      this.downloadPDFSubscription = this.exempService.downloadReport(this.form.value, c).subscribe(resp => {
        console.log(resp);
        // alert("download")
        let blob = new Blob([resp], {type: 'application/pdf'});
       let filename = this.form.value.firstName + '-' + this.form.value.candidate[c].organizationName + '.pdf'
       saveAs(blob, filename);
        
      },
      // err => {
      //   this.setMessage = { message: err.error.message, error: true };
      //   this.error = this.setMessage.message;
      //   throw this.setMessage.message;
      //  }
       )
    } 

    // allIntitution =[]
    // getAllIntitutionName(){
    //   this.exempService.getAllInstitution().subscribe(resp => {
    //     this.allIntitution = resp.data;
    //     console.log(resp.data[0]._id);
    //   })
    // }

    allOrganizationName = []
    onKeydown(event){
      this.value = event;
      // for(var i=0; i<this.candidate.length; i++){
      //   if(this.candidate[i].organizationName == this.index){
         
      //   }
      // }
      if(this.form.value.candidate.organizationName !== ''){
      this.searchorgSubscription = this.exempService.searchOrgName(event).subscribe(resp => {
       console.log(resp.data);
       this.allOrganizationName = resp.data;
      //  this.value = resp.data.allOrganizationName.organizationName;
      }, err => {
        this.setMessage = { message: err.error.message, error: true };
        this.error = this.setMessage.message;
        throw this.setMessage.message;
      })
     }
    } 
    allIntitutionName = []
    onKeyup(event){
      this.value = event;
      if(this.form.value.candidate.intitutionName !== ''){
      this.searchInstSubscription = this.exempService.searchInstName(event).subscribe(resp => {
       console.log(resp.data);
       this.allIntitutionName = resp.data;
      }, err => {
        this.setMessage = { message: err.error.message, error: true };
        this.error = this.setMessage.message;
        throw this.setMessage.message;
      })
     }
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
        // if(resp.statusCode == 200){}
        // if(resp.statusCode == 410){
        //   this.methodtype = "duplicate";
        //   this.openDialog();
        // }
        this.methodtype = "save";
        this.openDialog();
      }, err => {
        // if(this.error){
        //   this.methodtype = "save";
        //   this.openDialog();;
        // }
        this.setMessage = { message: err.error.message, error: true };
        this.error = this.setMessage.message;
        throw this.setMessage.message;
       })
    }
  




  update(id: number) {
    this.candUpdateSubscription = this.exempService.updateCandidate(this.form.value).subscribe(resp =>{
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
      this.Message = "Candidate Updated successfully"
    } else if(this.methodType == 'save') {
      this.Message = "Candidate added successfully"
    } else if(this.methodType == 'duplicate') {
      this.Message = "Record already exists"
    }
    //  else {
    //   this.Message ="Candidate added successfully"
    // }
    
  }

  close() {
    this.dialogRef.close(true);
    this.router.navigate(['/hrcandidate-list']);
  }
}