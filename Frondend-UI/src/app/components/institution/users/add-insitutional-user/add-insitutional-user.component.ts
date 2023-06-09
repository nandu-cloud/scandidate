import { Component, ChangeDetectorRef, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdministituteService } from '../../../../services/administitute.service';
import { StorageService } from '../../../../services/storage.service'
@Component({
  selector: 'app-add-insitutional-user',
  templateUrl: './add-insitutional-user.component.html',
  styleUrls: ['./add-insitutional-user.component.css'],
  providers: [ AdministituteService, StorageService ]
})
export class AddInsitutionalUserComponent implements OnInit {
  createUser: FormGroup;
  userSubscription: Subscription;
  setMessage: any = {};
  msg: String; status: String;
  error = '';
  userIdedit: number;
  edituserSubscription: Subscription;
  userupdateSubscription: Subscription;
  id: any;
  userId: any;
  updateUserData: number;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,
    private instituteUser: AdministituteService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.userIdedit = params.id;
  });
    this.createUser = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      role: new FormControl('Institution'),
      subRole: new FormControl('Line HR'),
      email: new FormControl('',[Validators.required, Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      dateOfBirth: new FormControl(''),
      phoneNumber: new FormControl('',[Validators.required, Validators.pattern('^[1-9][0-9]{9}$')]),
      status: new FormControl('')
    })
  }

  registrationForm = this.fb.group({
    file: [null]
  })  

  close(){
    setTimeout(() => {
      this.error='';
     }, 100);
    //  this.loginForm.reset();
  }
  methodtype;
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      
    });
    dialogRef.componentInstance.metrhodType = this.methodtype;
  }
  onSubmit(){
    if(this.createUser.invalid) {
      return;
    }

    const id =localStorage.getItem('instutuinId')
    const userId = localStorage.getItem('_id')
    this.userSubscription = this.instituteUser.createUser(this.createUser.value, id, userId).subscribe(resp => {
      console.log(this.createUser.value);
      this.methodtype = "create"
      this.openDialog();
    }, err =>{
      this.error = this.setMessage.message;
      this.setMessage = { message: err.error.message, error: true };
      throw this.setMessage.message;
    })
  }
  ngOnInit() {
    this.edituserSubscription = this.instituteUser.getUserById(this.userIdedit).subscribe(respObj => {
       console.log(respObj.data);
       this.id = respObj.data._id;
       this.createUser.patchValue(respObj.data);
    })
  }

  onupdate(id: number, userId: number){
    this.updateUserData = id;
    // const instid =localStorage.getItem('instutuinId');
    this.userupdateSubscription = this.instituteUser.updateUser(this.createUser.value, id, userId).subscribe(resp => {
      this.methodtype = "update";
      this.openDialog();
      console.log("response Object", resp);
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
      this.Message="User Updated successfully"
    }else{
      this.Message="User Created successfully"

    }
  }
  close(){
    this.dialogRef.close(true);
    this.router.navigate(['/insitution-users-list']);
 }
}