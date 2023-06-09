import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit ,Input } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup ,FormControl} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { instituteService } from '../../../../services/institute.service';
import { StorageService } from '../../../../services/storage.service';
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-add-initution',
  templateUrl: './add-initution.component.html',
  styleUrls: ['./add-initution.component.css'],
  providers: [ instituteService,StorageService ]
})
export class AddInitutionComponent implements OnInit {
  baseUrl = environment.baseUrl;
  [x: string]: any;
  instituteForm: FormGroup;
  instituteSubscription: Subscription;
  instituteUpdateSubscription: Subscription;
  setMessage: any = {};
  error = '';
  Message = '';
  editInstituteSubscription: Subscription;
  createInstituteData: FormGroup;
  editInstituteData: FormGroup;
  instituteIdedit:number;
  id;
  minDate = new Date(1990, 0, 1);
  // maxDate = new Date;
  maxDate = (new Date()).getFullYear();
  instituteIdupdate : number ;
  imageUrl: any = '';
  imageFilename:string='';
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,public instituteService: instituteService,public route:ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
          this.instituteIdedit = params.id;
    });
    this.instituteForm = new FormGroup({
      instituteName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      contactPersonName: new FormControl('', [Validators.required,Validators.minLength(5)]),
      instituteAddress : new FormControl('',[Validators.required]),
      instituteEmail: new FormControl('', [Validators.required, Validators.email]),
      instituteZIP : new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{5,7}$/)]),
      status : new FormControl('',[Validators.required]),
      instituteDescription : new FormControl(''),
      code : new FormControl(''),
      contact : new FormControl('',[Validators.required, Validators.pattern('^[1-9][0-9]{9}$')]),
      instituteType : new FormControl('',[Validators.required]),
      instituteStudentSize : new FormControl(''),
      instituteActiveFrom : new FormControl('', [Validators.max(new Date().getFullYear())]),
      instituteLogo : new FormControl(),
      instituteLocation : new FormControl('',[Validators.required]),
      state : new FormControl('',[Validators.required]),
      landMark : new FormControl()
    })
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

  @ViewChild('fileInput') el: ElementRef;
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(file: FileList) {
    this.fileToUpload = file.item(0);
    var render = new FileReader();
    render.onload = (event: any) => {
      // this.imageUrl = event.target.result;
    }
    render.readAsDataURL(this.fileToUpload);
    this.instituteSubscription = this.instituteService.postFile(this.fileToUpload).subscribe(
      data => {
        this.instituteForm.patchValue({instituteLogo: data.data.instituteLogo});
        this.imageUrl=`${this.baseUrl}/public/institute_logo/${data.data.instituteLogo}`;
       // this.instituteSubscription = this.instituteService.deleteFile(this.imageFilename).subscribe();
      }
    )
  }

  ngOnInit(){
    if(this.instituteIdedit){
    this.editInstituteSubscription = this.instituteService.editInstitute(this.instituteIdedit).subscribe(respObj => {
      console.log(respObj.data);
      this.id = respObj.data._id;
      this.instituteForm.patchValue(respObj.data);
      this.imageUrl=`${this.baseUrl}/public/institute_logo/${respObj.data.instituteLogo}`;
      this.imageFilename=respObj.data.instituteLogo;
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }
}

changeCode() {
  {
    if (this.instituteForm.value.instituteName.length > 0) {
      this.instituteForm.patchValue({ code: this.instituteForm.value.instituteName.slice(0, 5).toUpperCase() })
    }
  }
}


  submit(){
   if(!this.instituteIdedit){
    this.instituteSubscription = this.instituteService.checkAddInstitute(this.instituteForm.value).subscribe(resp =>{
      this.openDialog();
    }, err =>{
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    })
  }
}
  update(id:number){
    if( this.instituteForm.valid){
    this.instituteIdupdate = id;
    this.instituteUpdateSubscription = this.instituteService.updateInstitute(this.instituteForm.value).subscribe(resp =>{
      this.methodtype="update";
      this.openDialog();

    }, err =>{
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    })
  }
}
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
})
export class DialogElementsExampleDialog implements OnInit{
  @Input() methodType: any
  Message: any;
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,private router:Router
    ) {
      console.log(this.methodType)
    }

    ngOnInit(){
      console.log(this.methodType)
      if(this.methodType == 'update'){
        this.Message="Institution Updated successfully."
      }else{
        this.Message="Institution Onboarded successfully."

      }
    }
  close(){
    this.dialogRef.close(true);
    this.router.navigate(['/inistution-list']);
 }
}
