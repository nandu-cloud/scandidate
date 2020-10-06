import { Component, ChangeDetectorRef, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdministituteService } from '../../../../services/administitute.service';
@Component({
  selector: 'app-add-insitutional-user',
  templateUrl: './add-insitutional-user.component.html',
  styleUrls: ['./add-insitutional-user.component.css']
})
export class AddInsitutionalUserComponent  {
  createUser: FormGroup;
  userSubscription: Subscription;
  setMessage: any = {};
  msg: String; status: String;
  error = '';

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,
    private instituteUser: AdministituteService
  ) {
    this.createUser = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      role: new FormControl('INSTITUTION'),
      subRole: new FormControl('OPERATIONAL_USER'),
      email: new FormControl(),
      dateOfBirth: new FormControl(),
      phoneNumber: new FormControl(),
      status: new FormControl()
    })
  }

  registrationForm = this.fb.group({
    file: [null]
  })  
  methodtype;
  openDialog() {
    // this.dialog.open(DialogElementsExampleDialog);
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      
    });
    dialogRef.componentInstance.metrhodType = this.methodtype;
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {

      } else {
      }
    })
  }
  onSubmit(){
    const id =localStorage.getItem('instutuinId')
    this.userSubscription = this.instituteUser.createUser(this.createUser.value,id).subscribe(resp => {
      console.log(this.createUser.value);
      this.methodtype = "create"
      this.openDialog();
    }, err =>{
      this.error = this.setMessage.message;
      this.setMessage = { message: err.error.message, error: true };
      throw this.setMessage.message;
    })
  }
  ngOnInit(): void {
  }

}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
})
export class DialogElementsExampleDialog implements OnInit{
  @Input() metrhodType: any
  Message: any;
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,private router:Router
  ) {
    console.log(this.metrhodType)
  }
  ngOnInit(){
    console.log(this.metrhodType)
    if(this.metrhodType == 'update'){
      this.Message="Users onboarded Updated successfully"
    }else{
      this.Message="Users onboarded Created successfully"

    }
  }
  close(){
    this.dialogRef.close(true);
    this.router.navigate(['/insitution-users-list']);
 }
}