import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup ,FormControl} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { environment } from '../../environments/environment'
import { addOrganizationService } from '../services/addOrganization.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css'],
  providers: [ addOrganizationService,StorageService ]
})
export class AddOrganizationComponent implements OnInit {
  [x: string]: any;
  baseUrl = environment.baseUrl;
  organizationForm: FormGroup;
  orgSubscription: Subscription;
  orgupdateSubscription: Subscription;
  public setMessage: any = {};
  error = '';
  editorganizationSubscription: Subscription;
  orglogoSubscription : Subscription;
  createOrgData: FormGroup;
  editOrgData: FormGroup;
  orgIdedit:number;
  id;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date;
  orgIdupdate : number ;
  imageUrl: any = '';
  imageFilename:string='';
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,public orgService: addOrganizationService,public route:ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
          this.orgIdedit = params.id;
    });
    this.organizationForm = new FormGroup({
      organizationName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      contactPersonName: new FormControl('', [Validators.required,Validators.minLength(5)]),
      organisationAddress : new FormControl('',[Validators.required]),
      organisationEmail: new FormControl('', [Validators.required, Validators.email]),
      organisationZIP : new FormControl('',[Validators.required]),
      status : new FormControl('',[Validators.required]),
      organisationDescription : new FormControl('',[Validators.required]),
      code : new FormControl('',[Validators.required]),
      contact : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      organisationType : new FormControl('',[Validators.required]),
      organisationEmployeeSize : new FormControl('',[Validators.required]),
      organisationActiveFrom : new FormControl('',[Validators.required]),
      organisationLogo : new FormControl('',[Validators.required]),
    })
  }

  registrationForm = this.fb.group({
    file: [null]
  })
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
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
    this.orgSubscription = this.orgService.postFile(this.fileToUpload).subscribe(
      data => {
        this.organizationForm.patchValue({organisationLogo: data.data.organisationLogo});
        console.log(data.data.organisationLogo);

        this.imageUrl=`${this.baseUrl}/public/organization_logo/${data.data.organisationLogo}`;
        this.orgSubscription = this.orgService.deleteFile(this.imageFilename).subscribe();
      }
    )
    
    
  }

 ngOnInit(){
    if(this.orgIdedit){
    this.editorganizationSubscription = this.orgService.editOrganization(this.orgIdedit).subscribe(respObj => {
      console.log(respObj.data);
      this.id = respObj.data._id;
      this.organizationForm.patchValue(respObj.data);
      this.imageUrl=`${this.baseUrl}/public/organization_logo/${respObj.data.organisationLogo}`;
      this.imageFilename=respObj.data.organisationLogo;
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }
}

  submit(){
    if(!this.orgIdedit){
    this.orgSubscription = this.orgService.checkAddOrganization(this.organizationForm.value).subscribe(resp =>{
      console.log(this.organizationForm.value)

      this.openDialog();
    }), err =>{
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    }
    
  }
}
  update(id:number){
    this.orgIdupdate = id;
    this.orgupdateSubscription = this.orgService.updateOrganization(this.organizationForm.value).subscribe(resp =>{
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
    this.router.navigate(['/organization-list']);
 }
}
