import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { addOrganizationService } from '../../../../services/organization.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css'],
  providers: [addOrganizationService, StorageService]
})
export class AddOrganizationComponent implements OnInit {
  [x: string]: any;

  companyName: string = '';
  companyName_code;
  baseUrl = environment.baseUrl;
  organizationForm: FormGroup;
  orgSubscription: Subscription;
  orgupdateSubscription: Subscription;
  public setMessage: any = {};
  error = '';
  editorganizationSubscription: Subscription;
  orglogoSubscription: Subscription;
  createOrgData: FormGroup;
  editOrgData: FormGroup;
  orgIdedit: number;
  id;
  minDate = new Date();
  maxDate = (new Date()).getFullYear();
  orgIdupdate: number;
  imageUrl: any = '';
  imageFilename: string = '';
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
     public dialog: MatDialog,
      public orgService: addOrganizationService,
       public route: ActivatedRoute
  ) {
    console.log(this.maxDate);
    console.log(this.companyName);
    this.companyName_code = this.companyName.substr(0, 4).toUpperCase;
    console.log(this.companyName_code);
    this.route.params.subscribe(params => {
      this.orgIdedit = params.id;
    });
    this.organizationForm = new FormGroup({
      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      contactPersonName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      organisationAddress: new FormControl('', [Validators.required]),
      organisationEmail: new FormControl('', [Validators.required, Validators.email]),
      organisationZIP: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{5,7}$/)]),
      status: new FormControl('', [Validators.required]),
      organisationDescription: new FormControl(''),
      code: new FormControl(''),
      contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
      organisationType: new FormControl(''),
      organisationEmployeeSize: new FormControl(''),
      organisationActiveFrom: new FormControl('', [Validators.max(new Date().getFullYear())]),
      organisationLogo: new FormControl(''),
      legalEntityName: new FormControl('', [Validators.required]),
      organizationLocation: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      headQuaterLocation: new FormControl('', [Validators.required]),
      organizationGstn: new FormControl(''),
      organizationCin: new FormControl(''),
      panNumber: new FormControl(''),
      landMark: new FormControl('')
    })
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
        this.organizationForm.patchValue({ organisationLogo: data.data.organisationLogo });
        console.log(data.data.organisationLogo);
        this.imageUrl = `${this.baseUrl}/public/organization_logo/${data.data.organisationLogo}`;
        this.orgSubscription = this.orgService.deleteFile(this.imageFilename).subscribe();
      }
    )
  }

  ngOnInit() {
    if (this.orgIdedit) {
      this.editorganizationSubscription = this.orgService.editOrganization(this.orgIdedit).subscribe(respObj => {
        console.log(respObj.data);
        this.id = respObj.data._id;
        this.organizationForm.patchValue(respObj.data);
        this.imageUrl = `${this.baseUrl}/public/organization_logo/${respObj.data.organisationLogo}`;
        this.imageFilename = respObj.data.organisationLogo;
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
  }

  changeCode() {
    {
      if (this.organizationForm.value.organizationName.length > 0) {
        this.organizationForm.patchValue({ code: this.organizationForm.value.organizationName.slice(0, 5).toUpperCase() })
      }
    }
  }

  submit() {
    if (!this.orgIdedit) {
      this.orgSubscription = this.orgService.checkAddOrganization(this.organizationForm.value).subscribe(resp => {
        console.log(this.organizationForm.value);
        this.openDialog();
      }, err => {
        this.setMessage = { message: err.error.message, error: true };
        this.error = this.setMessage.message;
        throw this.setMessage.message;
      })
    }
  }
  update(id: number) {
    if (this.organizationForm.valid) {
      this.orgIdupdate = id;
      this.orgupdateSubscription = this.orgService.updateOrganization(this.organizationForm.value).subscribe(resp => {
        this.methodtype = "update";
        this.openDialog();
      }, err => {
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
export class DialogElementsExampleDialog implements OnInit {
  @Input() methodType: any
  Message: any;
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>, private router: Router
  ) {
    console.log(this.methodType)
  }

  ngOnInit() {
    console.log(this.methodType)
    if (this.methodType == 'update') {
      this.Message = "Organization Updated successfully"
    } else {
      this.Message = "Organization Onboarded successfully"

    }
  }

  close() {
    this.dialogRef.close(true);
    this.router.navigate(['/organization-list']);
  }
}
