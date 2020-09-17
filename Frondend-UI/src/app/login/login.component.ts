import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators,FormControl } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  name:string;
  showlogin:boolean=true;
  showForgetPassword:boolean=false;
  showOtp:boolean=false;
  showNewPassword:boolean=false;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  constructor(private router:Router,private route:ActivatedRoute,public dialog: MatDialog) { }

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
  login(){
    this.router.navigate(['/dashboard']);
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
