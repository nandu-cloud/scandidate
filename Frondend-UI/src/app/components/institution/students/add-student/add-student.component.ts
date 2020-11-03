import { ChangeDetectorRef, Component, OnInit,Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { StorageService } from '../../../../services/storage.service'
import { from, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { instituteService } from 'src/app/services/institute.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  providers: [ StudentService,StorageService ]
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  extraActivities: boolean = false;
  fileToUpload: File;
  fileToUpload1: File;
  studentSubscription: Subscription;
  editStudentSubscription : Subscription;
  stuupdateSubscription : Subscription;
  studentDocSubscription : Subscription;
  baseUrl = environment.baseUrl;
  documentName: any;
  studentIdedit:number;
  public setMessage: any = {};
  error = '';
  extraActivity : string;
  id;
  stdIdupdate : number ;
  myFiles:File[] = [];
  edudocumentName: string;
  documentCount: any;
  imagePreview = false;
  files:File  []  =  [];
  instituteName: any = window.sessionStorage.getItem('instName');

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef, public dialog: MatDialog,public route:ActivatedRoute, public stuService:StudentService,
    private appuserService:instituteService
  ) {
    this.route.params.subscribe(params => {
      this.studentIdedit = params.id;
    });
    this.studentForm = new FormGroup({
      lastName : new FormControl(''),
      firstName : new FormControl('',[Validators.required,Validators.minLength(3)]),
      roll : new FormControl(),
      email : new FormControl('', [Validators.email,Validators.required]),
      address : new FormControl(''),
      noOfEductionalDocuments : new FormControl('',[Validators.maxLength(1)]),
      nameOfCourse: new FormControl('', [Validators.required]),
      yearOfJoining: new FormControl('',[Validators.required,this.validateJoining()]),
      phoneNumber : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      aadharNo : new FormControl('',[Validators.required,Validators.minLength(12),Validators.maxLength(12)]),
      yearOfPassout: new FormControl('',[Validators.required,this.validatePassout()]),
      studentType : new FormControl(''),
      extraActivity : new FormControl(''),
      extraActivityDocumentName : new FormControl(),
      eductionalDocumentNames : new FormControl(),
      intitutionName : new FormControl(this.instituteName, [Validators.required]),
      eductionalDocumentLinks: new FormControl(),
      extraActivityDocumentLink : new FormControl()
    })
   }
   validatePassout(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.studentForm !== undefined) {
        //const arrivalDate = control.value;
        const exitDate = this.studentForm.controls['yearOfPassout'].value;
        const joiningDate = this.studentForm.controls['yearOfJoining'].value
        if (exitDate <= joiningDate) return { requiredToDate: true };
      }
    };
  }

  validateJoining(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.studentForm !== undefined) {
        const exitDate = this.studentForm.controls['yearOfPassout'].value;
        const fexitDate = new Date(exitDate);
        const joiningDate = this.studentForm.controls['yearOfJoining'].value;
        if (fexitDate <= joiningDate) return { requiredFromDate: true };
      }
    };
  }
   activities(event) {
    if(event.value == "1"){
      this.extraActivities = true;
    } else {
      this.extraActivities = false;
    }
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
  
  uploadFile(file: FileList) {
    this.fileToUpload = file[0];
    this.documentName = this.fileToUpload.name;
    this.studentDocSubscription = this.stuService.postFile(this.fileToUpload).subscribe(
      data => {
        this.studentForm.patchValue({extraActivityDocumentName: data.data.extraActivityDocumentName});
        console.log(data.data.extraActivityDocumentName);

        this.documentName=`${this.baseUrl}/public/student_doc/${data.data.extraActivityDocumentName}`;
        // this.studentDocSubscription = this.stuService.deleteFile(this.imageFilename).subscribe();
      }
    )
  }
  uploadEducationFile(event) {
    for  (var i =  0; i <  event.target.files.length; i++)  {  
      this.files.push(event.target.files[i]);
  }
    this.studentDocSubscription = this.stuService.postEducationFile(this.files).subscribe(
      data => {
        this.studentForm.patchValue({eductionalDocumentNames: data.data.eductionalDocumentNames});
        console.log(data.data.eductionalDocumentNames);

        this.edudocumentName=`${this.baseUrl}/public/student_doc/${data.data.eductionalDocumentNames}`;
        this.imagePreview = true;
        this.documentCount = data.data.fileCount;
      }
    )
  }

  close(){
    setTimeout(() => {
      this.error='';
     }, 100);
    //  this.loginForm.reset();
  }
  
 
  submit(){
    if(!this.studentIdedit){
    this.studentSubscription = this.stuService.addStudent(this.studentForm.value).subscribe(resp =>{
      console.log(this.studentForm.value);

      this.openDialog();
    }, err =>{
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    })
    
  }
}
ngOnInit(){
  if(this.studentIdedit){
  this.editStudentSubscription = this.stuService.editStudent(this.studentIdedit).subscribe(respObj => {
    console.log(respObj.data);
    this.id = respObj.data._id;
    if(respObj.data.extraActivity == "1"){
      this.extraActivities = true;
    } else {
      this.extraActivities = false;
    }
    this.studentForm.patchValue(respObj.data);
    this.imagePreview = true;
    this.documentName=`${this.baseUrl}/public/student_doc/${respObj.data.extraActivityDocumentName}`;
    this.documentCount = respObj.data.noOfEductionalDocuments;
  }, err => {
    this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
  })
}
}
update(id:number){
  this.stdIdupdate = id;
  this.stuupdateSubscription = this.stuService.updateStudent(this.studentForm.value).subscribe(resp =>{
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
        this.Message="Student Updated successfully"
      }else{
        this.Message="Student Onboarded successfully"

      }
    }
  close(){
    this.dialogRef.close(true);
    this.router.navigate(['/student-list']);
 }
}