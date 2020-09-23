import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup ,FormControl} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { instituteService } from '../services/addInstitute.service';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-add-initution',
  templateUrl: './add-initution.component.html',
  styleUrls: ['./add-initution.component.css'],
  providers: [ instituteService,StorageService ]
})
export class AddInitutionComponent implements OnInit {
  [x: string]: any;
  instituteForm: FormGroup;
  instituteSubscription: Subscription;
  instituteUpdateSubscription: Subscription;
  setMessage: any = {};
  error = '';
  editInstituteSubscription: Subscription;
  createInstituteData: FormGroup;
  editInstituteData: FormGroup;
  instituteIdedit:number;
  id;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date;
  instituteIdupdate : number ;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,public instituteService: instituteService,public route:ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
          this.instituteIdedit = params.id;
    });
    this.instituteForm = new FormGroup({
      instituteName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      contactPersonName: new FormControl('', [Validators.required,Validators.minLength(5)]),
      instituteAddress : new FormControl('',[Validators.required]),
      instituteEmail: new FormControl('', [Validators.required, Validators.email]),
      instituteZIP : new FormControl('',[Validators.required]),
      status : new FormControl('',[Validators.required]),
      instituteDescription : new FormControl('',[Validators.required]),
      code : new FormControl('',[Validators.required]),
      contact : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      instituteType : new FormControl('',[Validators.required]),
      instituteStudentSize : new FormControl('',[Validators.required]),
      instituteActiveFrom : new FormControl('',[Validators.required]),
      file : new FormControl('',[Validators.required]),
    })
  }

  registrationForm = this.fb.group({
    file: [null]
  })
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = '../../assets/images/org-logo.png';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }

  ngOnInit(){
    if(this.instituteIdedit){
    this.editInstituteSubscription = this.instituteService.editInstitute(this.instituteIdedit).subscribe(respObj => {
      console.log(respObj.data);
      this.id = respObj.data._id;
      this.instituteForm.patchValue(respObj.data);
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }
}

  submit(){
    console.log("khfdjhf")
    if(!this.instituteIdedit){
    this.instituteSubscription = this.instituteService.checkAddInstitute(this.instituteForm.value).subscribe(resp =>{
      this.openDialog();
    }), err =>{
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    }
  }
}
  update(id:number){
    this.instituteIdupdate = id;
    this.instituteUpdateSubscription = this.instituteService.updateInstitute(this.instituteForm.value).subscribe(resp =>{
      this.openDialog();

    }), err =>{
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    }
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,private router:Router
  ) {}
  close(){
    this.dialogRef.close(true);
    this.router.navigate(['/inistution-list']);
 }
}
