import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { addOrganizationService } from '../../../../services/organization.service';
import { StorageService } from '../../../../services/storage.service';
import { HrpartnerService } from '../../../../services/hrpartner.service';
@Component({
  selector: 'app-add-hr-partner',
  templateUrl: './add-hr-partner.component.html',
  styleUrls: ['./add-hr-partner.component.css']
})
export class AddHrPartnerComponent implements OnInit {
  [x: string]: any;
  
  companyName: string = '';
  companyName_code;
  baseUrl = environment.baseUrl;
  hrForm: FormGroup;
  orgSubscription: Subscription;
  orgupdateSubscription: Subscription;
  public setMessage: any = {};
  error = '';
  editHrPartnerSubscription: Subscription;
  hrPartnerSubscription: Subscription;
  orglogoSubscription: Subscription;
  createOrgData: FormGroup;
  editHrData: FormGroup;
  hrIdedit: number;
  id;
  minDate = new Date();
  maxDate = (new Date()).getFullYear();
  hrIdupdate: number;
  imageUrl: any = '';
  imageFilename: string = '';

  constructor( public fb: FormBuilder,
        private cd: ChangeDetectorRef,
        public dialog: MatDialog,
        public hrService: HrpartnerService,
        public route: ActivatedRoute) {
      console.log(this.maxDate);
    console.log(this.companyName);
    this.companyName_code = this.companyName.substr(0, 4).toUpperCase;
    console.log(this.companyName_code);
    this.route.params.subscribe(params => {
      this.hrIdedit = params.id;
    });
    this.hrForm = new FormGroup({
      hrorganizationname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      hrcontactPersonName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      hrorganisationAddress: new FormControl('', [Validators.required]),
      hrorganisationEmail: new FormControl('', [Validators.required, Validators.email]),
      hrorganisationZIP: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{5,7}$/)]),
      status: new FormControl('', [Validators.required]),
      hrorganisationDescription: new FormControl(''),
      code: new FormControl(''),
      contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
      hrorganisationType: new FormControl(''),
      hrorganisationEmployeeSize: new FormControl(''),
      hrorganisationActiveFrom: new FormControl('', [Validators.max(new Date().getFullYear())]),
      hrorganisationLogo: new FormControl(''),
      legalEntityName: new FormControl('', [Validators.required]),
      hrorganizationLocation: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      headQuaterLocation: new FormControl('', [Validators.required]),
      hrorganizationGstn: new FormControl(''),
      hrorganizationCin: new FormControl(''),
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
   uploadFile(file: FileList) {
    this.fileToUpload = file.item(0);
    var render = new FileReader();
    render.onload = (event: any) => {
      // this.imageUrl = event.target.result;
    }
    render.readAsDataURL(this.fileToUpload);
    this.orgSubscription = this.hrService.postFile(this.fileToUpload).subscribe(
      data => {
        this.hrForm.patchValue({ hrorganisationLogo: data.data.hrorganisationLogo });
        console.log(data.data.hrorganisationLogo);
        this.imageUrl = `${this.baseUrl}/public/organization_logo/${data.data.hrorganisationLogo}`;
        this.orgSubscription = this.orgService.deleteFile(this.imageFilename).subscribe();
      }
    )
  }
  
  ngOnInit(): void {
    if (this.hrIdedit) {
      this.editHrPartnerSubscription = this.hrService.editHrPartner(this.hrIdedit).subscribe(respObj => {
        console.log(respObj.data);
        this.id = respObj.data._id;
        this.hrForm.patchValue(respObj.data);
        this.imageUrl = `${this.baseUrl}/public/organization_logo/${respObj.data.hrorganisationLogo}`;
      }, err => {
        // this.imageFilename = respObj.data.organisationLogo;
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
  }
  changeCode() {
    {
      if (this.hrForm.value.hrorganizationname.length > 0) {
        this.hrForm.patchValue({ code: this.hrForm.value.hrorganizationname.slice(0, 5).toUpperCase() })
      }
    }
  }
  submit() {
    if (!this.hrIdedit) {
      this.orgSubscription = this.hrService.addHrPartner(this.hrForm.value).subscribe(resp => {
        console.log(this.hrForm.value);
        this.openDialog();
      }, err => {
        this.setMessage = { message: err.error.message, error: true };
        this.error = this.setMessage.message;
        throw this.setMessage.message;
      })
    }
  }
  update(id: number) {
    if (this.hrForm.valid) {
      this.orgIdupdate = id;
      this.hrPartnerSubscription = this.hrService.updateHrPartner(this.hrForm.value, this.orgIdupdate).subscribe(resp => {
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
      this.Message = "Hr-Partner Updated successfully"
    } else {
      this.Message = "Hr-Partner Onboarded successfully"

    }
  }

  close() {
    this.dialogRef.close(true);
    this.router.navigate(['/hrPartner-list']);
  }
}