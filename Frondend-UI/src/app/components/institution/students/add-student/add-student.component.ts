import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { StorageService } from '../../../../services/storage.service'
import { from, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { instituteService } from 'src/app/services/institute.service';
import { FileUploader } from 'ng2-file-upload';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  providers: [ StudentService, StorageService ]
})
export class AddStudentComponent implements OnInit {
  selectedFiles: FileList
  fileName: string = '';
  educdoc: any;
  eductionalDoc: any = [];
  displaySelectedFiles:any=[];
  selectedIndex: number = 0;
  tabChangeEvent: any;
  firstFormGroup: any;
  secondFormGroup: any;
  purposeOfFile : any;
  documentNameData: string;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef, public dialog: MatDialog, public route: ActivatedRoute,
     public stuService: StudentService,public formBuilder:FormBuilder,
    private appuserService: instituteService
  ) {
    this.route.params.subscribe(params => {
      this.studentIdedit = params.id;
    });
    this.firstFormGroup = new FormGroup({
      lastName : new FormControl('', [Validators.required]),
      firstName : new FormControl('', [Validators.required, Validators.minLength(3)]),
      roll : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.email]),
      address : new FormControl(''),
      dateOfBirth: new FormControl(''),
      nameOfCourse: new FormControl('', [Validators.required]),
      yearOfJoining: new FormControl('', [Validators.required, this.validateJoining()]),
      phoneNumber : new FormControl('', [ Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
      adharNumber : new FormControl('', [Validators.minLength(12), Validators.maxLength(12)]),
      yearOfPassout: new FormControl('', [Validators.required, this.validatePassout()]),
      studentType : new FormControl('', [Validators.required]),
      intitutionName : new FormControl(this.instituteName, [Validators.required]),
      landMark : new FormControl(),
      city : new FormControl(),
      state : new FormControl(),
      zipCode : new FormControl()
    });
    this.secondFormGroup = new FormGroup({
      extraActivityDocumentName : new FormControl(),
      eductionalDocumentNames : new FormControl(),
      purposeOfFile: new FormControl(''),
      purposeofoffer: new FormArray([]),
      eductionalDocumentLinks: new FormControl(),
      extraActivity: new FormControl(),
      extraActivityDocumentLink : new FormControl(),
      noOfEductionalDocuments : new FormControl(0, [Validators.maxLength(1)])
    });

    this.dynamicForm = this.formBuilder.group({
      // numberOfTickets: ['', Validators.required],
      purposeofoffer: new FormArray([])
  });
   }

   get f() { return this.dynamicForm.controls; }
   get t() { return this.f.purposeofoffer as FormArray; }

   maxNumberOfTabs: number;

   public tabChanged(tabChangedEvent: MatTabChangeEvent): void {
    this.selectedIndex = this.tabChangeEvent.index;
  }

  public nextStep(){
    if (this.firstFormGroup.valid){
      if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = 1
      }
    }
    // if (this.secondFormGroup.valid){
    //   if (this.selectedIndex != this.maxNumberOfTabs) {
    //     this.selectedIndex = 2
    //   }
    // }
  }

   onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                // email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}

   dynamicForm:FormGroup
   FormArray
  studentForm: FormGroup;
  extraActivities: boolean = false;
  fileToUpload: File;
  fileToUpload1: File;
  studentSubscription: Subscription;
  editStudentSubscription : Subscription;
  stuupdateSubscription : Subscription;
  studentDocSubscription : Subscription;
  deleteStudentSubscription : Subscription;
  viewStudentSubscription : Subscription;
  baseUrl = environment.baseUrl;
  documentName: any;
  studentIdedit: number;
  public setMessage: any = {};
  error = '';
  extraActivity : string;
  id;
  stdIdupdate : number ;
  myFiles: File[] = [];
  edudocumentName: string;
  documentCount: any;
  imagePreview = false;
  files: File  [] = [];
  educdocumentName:any;

  instituteName: any = window.sessionStorage.getItem('instName');
  registrationForm = this.fb.group({
    file: [null]
  })
  methodtype;
  public uploader: FileUploader = new FileUploader({

    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['xls']


    });

   validatePassout(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.firstFormGroup !== undefined) {
        //const arrivalDate = control.value;
        const exitDate = this.firstFormGroup.controls['yearOfPassout'].value;
        const joiningDate = this.firstFormGroup.controls['yearOfJoining'].value
        if (exitDate <= joiningDate) return { requiredToDate: true };
      }
    };
  }

  validateJoining(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.firstFormGroup !== undefined) {
        const exitDate = this.firstFormGroup.controls['yearOfPassout'].value;
        const fexitDate = new Date(exitDate);
        const joiningDate = this.firstFormGroup.controls['yearOfJoining'].value;
        if (fexitDate <= joiningDate) return { requiredFromDate: true };
      }
    };
  }
   activities(event) {
    if (event.value == "1"){
      this.extraActivities = true;
    } else {
      this.extraActivities = false;
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {

    });
    dialogRef.componentInstance.methodType = this.methodtype;
  }

  uploadFile(file: FileList) {
    this.fileToUpload = file[0];
    this.documentName = this.fileToUpload.name;
    this.studentDocSubscription = this.stuService.postFile(this.fileToUpload).subscribe(
      data => {
        this.secondFormGroup.patchValue({extraActivityDocumentName: data.data.extraActivityDocumentName});
        console.log(data.data.extraActivityDocumentName);

        this.documentNameData = `${this.baseUrl}/public/student_doc/${data.data.extraActivityDocumentName}`;
        // this.studentDocSubscription = this.stuService.deleteFile(this.imageFilename).subscribe();
      }
    )
  }
  uploadEducationFile(event) {
    this.selectedFiles = event.target.files;
    
    console.log('filename' + this.fileName);
    // tslint:disable-next-line: prefer-for-of
  
    for (let i = 0; i < event.target.files.length; i++)
    {
      
      this.files.push(event.target.files[i]);
 }

 const numberOfTickets = this.files.length || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                // email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }



  console.log("fileeeeeeee" + this.secondFormGroup.value.noOfEductionalDocuments);
    if ( this.secondFormGroup.value.noOfEductionalDocuments <= this.files.length && this.secondFormGroup.value.noOfEductionalDocuments >= this.files.length  ){
      // alert("Match count with No Of Do");
      this.displaySelectedFiles=this.files;
      console.log(this.selectedFiles)
      this.studentDocSubscription = this.stuService.postEducationFile(this.files).subscribe(
         data => {
           this.secondFormGroup.patchValue({eductionalDocumentNames: data.data.eductionalDocumentNames});
           console.log(data.data.eductionalDocumentNames);
   
           this.edudocumentName = `${this.baseUrl}/public/student_doc/${data.data.eductionalDocumentNames}`;
           this.imagePreview = true;
           this.documentCount = this.displaySelectedFiles.length;
           // this.displaySelectedFiles= [];
           // this.files= [];
           // this.fileName = data.data.name;
         }
       )
    }else{
       return false;
    }
 
    // const files: File = event[0];
    // this.docName = this.files.Files.name;

    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
   
  }

  close(){
    setTimeout(() => {
      this.error = '';
     }, 100);
    //  this.loginForm.reset();
  }
  
 
  submit(){
    console.log(this.firstFormGroup.value, this.secondFormGroup.value);
    console.log(this.dynamicForm.value)
let k=[]
    this.dynamicForm.value.purposeofoffer. forEach(element => {
  k.push(element.name)
});
console.log(k)
    if (!this.studentIdedit){
    // tslint:disable-next-line: max-line-length
    this.studentSubscription = this.stuService.addStudent(this.firstFormGroup.value, 
      this.secondFormGroup.value, k).subscribe(resp => {
      console.log(this.firstFormGroup.value, this.secondFormGroup.value);

      this.openDialog();
    }, err => {
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    })
    
  }
  
}

ngOnInit(){
  if (this.studentIdedit){
  this.editStudentSubscription = this.stuService.editStudent(this.studentIdedit).subscribe(respObj => {
    console.log(respObj.data);
    this.id = respObj.data._id;
    if (respObj.data.extraActivity == "1"){
      this.extraActivities = true;
    } else {
      this.extraActivities = false;
    }
    if(respObj.data.eductionalDocumentNames){
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < respObj.data.eductionalDocumentNames.length; i++)
     {
       const data = respObj.data.eductionalDocumentNames[i]
       this.eductionalDoc.push(data);
       console.log(this.eductionalDoc);
     }
    this.educdoc = respObj.data;
    }
    // this.onChangeTickets(2)
    
    // console.log(this.dynamicForm.value.purposeofoffer)
  //   .push(this.formBuilder.group({
  //     name: ['', Validators.required],
  //     // email: ['', [Validators.required, Validators.email]]
  // }));
    
    this.dynamicForm = this.formBuilder.group({
      // numberOfTickets: ['', Validators.required],
      purposeofoffer: new FormArray([
// this.createItem()
        
      ])
  });

//   this.dynamicForm.patchValue({
//     purposeofoffer: [
//              {
//             name: 'New York',
            
//    }]
// });


    this.firstFormGroup.patchValue(respObj.data);
    this.secondFormGroup.patchValue(respObj.data);
    this.imagePreview = true;
    this.documentName = `${this.baseUrl}/public/student_doc/${respObj.data.extraActivityDocumentName}`;
    this.educdocumentName = `${this.baseUrl}/public/student_doc/${respObj.data.eductionalDocumentNames}`;
     this.documentCount = respObj.data.noOfEductionalDocuments;

  }, err => {
    this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
  })
}
}


createItem() {
  // return this.formBuilder.group({
  //   name: 'sai',
  
  // });
return  this.t.push(this.formBuilder.group({
    name: ['ttttttt', Validators.required],
    // email: ['', [Validators.required, Validators.email]]
}));
}





// ngOnInit(){
//   if(this.studentIdedit){
//   this.editStudentSubscription = this.stuService.editStudent(this.studentIdedit).subscribe(respObj => {
//     console.log(respObj.data);
//     this.id = respObj.data._id;
//     if(respObj.data.extraActivity == "1"){
//       this.extraActivities = true;
//     } else {
//       this.extraActivities = false;
//     }
//     this.studentForm.patchValue(respObj.data);
//     this.imagePreview = true;
//     this.documentName=`${this.baseUrl}/public/student_doc/${respObj.data.extraActivityDocumentName}`;
//     this.documentCount = respObj.data.noOfEductionalDocuments;
//   }, err => {
//     this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
//   })
// }
// }

view(item){
  console.log("Hello" + item);
  // this.educdocumentName = `${this.baseUrl}/public/student_doc/${item}`;
  window.location.href = `${this.baseUrl}/public/student_doc/${item}`;
  this.viewStudentSubscription = this.stuService.viewFile(item).subscribe(respObj => {
    console.log(respObj.data);
  })
}

openDoc(educdocumentName: string){
  window.open(educdocumentName)
}
onDelete(item, studentIdedit) {
  console.log("hello" + item, studentIdedit);
  this.deleteStudentSubscription = this.stuService.deleteFile(item, studentIdedit).subscribe(respObj=> {
    console.log(respObj.data);
    this.documentCount--;
    // location.reload();
    this.methodtype = "delete";
    this.openDialog();
  })
  
}
update(id: number){
  this.stdIdupdate = id;
  // tslint:disable-next-line: max-line-length
  this.stuupdateSubscription = this.stuService.updateStudent({...this.firstFormGroup.value, ...this.secondFormGroup.value}).subscribe(resp => {
    this.methodtype = "update";
    this.openDialog();

  }, err => {
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
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>, private router: Router
    ) {
      console.log(this.methodType)
    }

    ngOnInit(){
      console.log(this.methodType)
      if (this.methodType == 'update'){
        this.Message = "Student Updated successfully"
      }
      if (this.methodType == 'delete') {
        this.Message = "Delete successfully"
      }
      else{
        this.Message = "Student added successfully"
      }

    }
  close(){
    this.dialogRef.close(true);
    this.router.navigate(['/student-list']);
    this.dialogRef.close(false);
 }
}