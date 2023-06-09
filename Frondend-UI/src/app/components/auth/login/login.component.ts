import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators,FormControl,FormGroup } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { from, Subscription, throwError } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { StorageService } from '../../../services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, StorageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgetPwd: FormGroup;
  verifyData: FormGroup;
  resetForm: FormGroup;
  hide = true;
  name:string;
  showlogin:boolean=true;
  showForgetPassword:boolean=false;
  showOtp:boolean=false;
  showNewPassword:boolean=false;
  public setMessage: any = {};
  loginSubscription : Subscription;
  emailSubscription : Subscription;
  otpSubscription : Subscription;
  resetSubscription : Subscription;
  verifyEmail:string;
  Otp : number;
  otp : number ;
  otp1 : number ;
  otp2 : number ;
  otp3 : number ;
  error = "";
  email = new FormControl('', [Validators.required, Validators.email]);
  close(){
    setTimeout(() => {
      this.error='';
     }, 100);
     this.loginForm.reset();
  }
  constructor(private router:Router,private route:ActivatedRoute,public dialog: MatDialog,public _loginService: LoginService
    , public _sessionStorage: StorageService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
    this.forgetPwd = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
    
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
  }
  loginPage(){
    this.showlogin=true;
    this.showOtp=false;
    this.showForgetPassword=false;
  }
  forgetPassword(){
    this.showlogin=false;
    this.showOtp=false;
    this.showForgetPassword=true;
  }
  verifyOtp(){
    this.showlogin=false;
    this.showOtp=true;
    this.showForgetPassword=false;
    this.showNewPassword=false;
  }

  newPassword(){
    this.showNewPassword=true;
    this.showlogin=false;
    this.showOtp=false;
    this.showForgetPassword=false;
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
     this.showlogin = true;
     this.showNewPassword = false;
    });
  }
  onSubmit(){
    if (this.loginForm.invalid) {
      return;
    }
    this.loginSubscription = this._loginService.checkUserLogin(this.loginForm.value).subscribe(resp => {
      let email = resp.data.email;
      let name = resp.data.firstName;
      let role = resp.data.role;
      let subRole = resp.data.subRole;
      let userId = resp.data._id;  
      let token = resp.data.token;
      let iniId = resp.data.institutionId;
      let orgId = resp.data.organizationId;
      let orgName = resp.data.organizationName;
      let hrorganisationId = resp.data.hrorganisationId;
      let hrorganizationname = resp.data.hrorganizationname;
      let errMsg = resp.message;
      let logo = resp.data.avatarLink;

      this._sessionStorage.setSession('token',token);
      this._sessionStorage.setSession('LoginName',name);
      this._sessionStorage.setSession('role',role);
      this._sessionStorage.setSession('subRole',subRole);
      this._sessionStorage.setSession('ID',userId);
      this._sessionStorage.setSession('InistutionId',iniId);
      this._sessionStorage.setSession('organizationId',orgId);
      this._sessionStorage.setSession('orgName', orgName);
      this._sessionStorage.setSession('hrorganisationId', hrorganisationId);
      this._sessionStorage.setSession('hrorganizationname', hrorganizationname);
      this._sessionStorage.setSession('logo',logo);
      if (resp.status.toUpperCase() == 'SUCCESS') {
      if(role == 'SCANDIDATE'){
        this._sessionStorage.setSession('isAuthenticated',true);
        this.router.navigate(['/dashboard']);
      } else if(role == 'INSTITUTION'){
       this._sessionStorage.setSession('isAuthenticated',true);
       localStorage.setItem('instutuinId', resp.data.institutionId)
       this.router.navigate(['/institutionDashboard']);
       localStorage.setItem('_id', resp.data._id)
       this.router.navigate(['/institutionDashboard']);
      } else if(role == 'ORGANIZATION'){
        this._sessionStorage.setSession('isAuthenticated',true);
        localStorage.setItem('organizationId',resp.data.organizationId);
        localStorage.setItem('orgName',resp.data.organizationName);
        this.router.navigate(['/organizationDashboard']);
      } else{
        this._sessionStorage.setSession('isAuthenticated', true);
        localStorage.setItem('hrorganisationId', resp.data.hrorganisationId);
        localStorage.setItem('hrpartnerorgname', resp.data.hrorganizationname);
        this.router.navigate(['/hrpartnerdashboard']);
      }
    }
    }, err => {
    this.setMessage = { message: err.error.message, error: true };
    this.error = this.setMessage.message;
    throw this.setMessage.message;
    // alert(error);
    // this.loginForm.reset();
  })
}
emailVerification(){
  this.emailSubscription = this._loginService.emailVerification(this.forgetPwd.value).subscribe(resp => {
    this.verifyEmail = this.forgetPwd.value;
    this.verifyOtp();
  }, err => {
    this.setMessage = { message: err.error.message, error: true };
    this.error = this.setMessage.message;
    throw this.setMessage.message;
  })
}

verifyEmailOtp(){
  this.Otp = this.otp + this.otp1 + this.otp2 + this.otp3;
  var converOtp: number = +this.Otp;
  console.log(converOtp);
  this.emailSubscription = this._loginService.otpVerification(this.verifyEmail,converOtp).subscribe(resp => {
    this.Otp = converOtp;
    this.newPassword();
  }, err => {
    this.setMessage = { message: err.error.message, error: true };
    this.error = this.setMessage.message;
    throw this.setMessage.message;
  })
}
onResetPwd(){
  if (this.resetForm.invalid) {
    return;
  }
  this.resetSubscription = this._loginService.resetLoginPassword(this.verifyEmail,this.Otp,this.resetForm.value,).subscribe(resp => {
    console.log(resp);
    this.openDialog();
  }, err => {
    this.setMessage = { message: err.error.message, error: true };
    this.error = this.setMessage.message;
    throw this.setMessage.message;
  });
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
   }
}
