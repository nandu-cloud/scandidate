import { Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExEmployeeService } from '../../service/ex-employee.service';

@Component({
  selector: 'app-add-hroppuser',
  templateUrl: './add-hroppuser.component.html',
  styleUrls: ['./add-hroppuser.component.css'],
  providers: [ExEmployeeService]
})
export class AddHroppuserComponent implements OnInit {
  organizationUserForm : FormGroup;
  orgUserSubscription : Subscription;
  editorganizationuserSubscription : Subscription;
  orgUserUpdateSubscription : Subscription;
  minDate ;
  maxDate = new Date;
  id;
  userIdedit;
  public setMessage: any = {};
  error = '';
  orgIdupdate;
  nonWhitespaceRegExp: RegExp = new RegExp("\\S");
  constructor(public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    public route:ActivatedRoute,
    public empService : ExEmployeeService) { 
      this.route.params.subscribe(params => {
        this.userIdedit = params.id;
    });
    this.organizationUserForm = new FormGroup({
      _id: new FormControl(), 
      firstName : new FormControl('', [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)]),
      lastName : new FormControl('', [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)]),
      phoneNumber : new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{9}$')]),
      email : new FormControl('', [Validators.required]),
      role: new FormControl('Agency', [Validators.required]),
      subRole: new FormControl('', [Validators.required]),
      dateOfBirth : new FormControl(''),
      workstation : new FormControl(''),
      status : new FormControl('')
    });
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
    if(this.userIdedit){
      this.editorganizationuserSubscription = this.empService.editOrganizationUser(this.userIdedit).subscribe(respObj => {
        console.log(respObj.data);
        this.id = respObj.data._id;
        this.organizationUserForm.patchValue(respObj.data);
        // this.imageUrl=`${this.baseUrl}/public/organization_logo/${respObj.data.organisationLogo}`;
        // this.imageFilename=respObj.data.organisationLogo;
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
  }
  submit(){
    if(!this.userIdedit){
    this.orgUserSubscription = this.empService.createUser(this.organizationUserForm.value).subscribe(resp =>{
      console.log(this.organizationUserForm.value);
      this.openDialog();
    }, err =>{
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    })
  }
}
update(id:number){
  this.orgIdupdate = id;
  this.orgUserUpdateSubscription = this.empService.updateUser(this.organizationUserForm.value).subscribe(resp =>{
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
        this.Message="Organization User Updated successfully"
      }else{
        this.Message="Organization User Onboarded successfully"

      }
    }

  close(){
    this.dialogRef.close(true);
    this.router.navigate(['/user-list']);
 }
}