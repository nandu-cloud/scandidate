import { Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { AdminOrganizationService } from '../../../../../services/admin-organization.service';
import { StorageService } from '../../../../../services/storage.service';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-oppuser',
  templateUrl: './add-oppuser.component.html',
  styleUrls: ['./add-oppuser.component.css'],
  providers: [ AdminOrganizationService,StorageService ]
})
export class AddOppuserComponent implements OnInit {
  organizationUserForm : FormGroup;
  orgUserSubscription : Subscription;
  editorganizationuserSubscription : Subscription;
  orgUserUpdateSubscription : Subscription;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date;
  id;
  userIdedit;
  public setMessage: any = {};
  error = '';
  orgIdupdate;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,public route:ActivatedRoute,public orgAdminService : AdminOrganizationService
  )  {
    this.route.params.subscribe(params => {
      this.userIdedit = params.id;
  });
    this.organizationUserForm = new FormGroup({
      _id: new FormControl(), 
      firstName : new FormControl('', [Validators.required]),
      lastName : new FormControl('', [Validators.required]),
      phoneNumber : new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{9}$')]),
      email : new FormControl('', [Validators.required]),
      role: new FormControl('ORGANIZATION', [Validators.required]),
      subRole: new FormControl('OPERATIONAL_USER', [Validators.required]),
      dateOfBirth : new FormControl(''),
      address : new FormControl(''),
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

  ngOnInit() : void{
    if(this.userIdedit){
      this.editorganizationuserSubscription = this.orgAdminService.editOrganizationUser(this.userIdedit).subscribe(respObj => {
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
    this.orgUserSubscription = this.orgAdminService.createUser(this.organizationUserForm.value).subscribe(resp =>{
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
  this.orgUserUpdateSubscription = this.orgAdminService.updateUser(this.organizationUserForm.value).subscribe(resp =>{
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
    this.router.navigate(['/orgnization-users-list']);
 }
}
