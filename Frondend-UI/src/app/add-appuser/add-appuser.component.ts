import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators,FormControl, FormGroup } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AppuserService } from '../services/appuser.service';

@Component({
  selector: 'app-add-appuser',
  templateUrl: './add-appuser.component.html',
  styleUrls: ['./add-appuser.component.css']
})
export class AddAppuserComponent implements OnInit {
  createUserData: FormGroup;
  teamSubscription$: any;
  setMessage: any = {};
  msg: String; status: String;
  constructor(
    public fb: FormBuilder, private router: Router,
    private cd: ChangeDetectorRef,public dialog: MatDialog, private user: UserService,
    private appUserService: AppuserService
    ) {
      this.createUserData = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      role: new FormControl(),
      subRole: new FormControl(),
      email: new FormControl(),
      dateOfBirth: new FormControl(),
      status: new FormControl(),
      phoneNumber: new FormControl(),
      organizationId: new FormControl(),
      institutionId: new FormControl(),
      employeeId: new FormControl(),
      currentAddress: new FormControl(),
      permanentAddress: new FormControl(),
      aboutMe: new FormControl(),
      avatarLink: new FormControl()
    })
    }

  ngOnInit() {

  }

  onSubmit(){
    if (this.createUserData.invalid) {
      return;
    }
    this.teamSubscription$ = this.appUserService.createUserData(this.createUserData.value).subscribe(resp => {
      console.log("response Object ", resp);
      this.openDialog();
      if (this.status === 'ERROR') {
        this.router.navigate(['/admin']);
        this.setMessage = { message: this.msg, error: true };
      } else if (this.status == 'SUCCESS') {
        this.router.navigate(['/users-list']);
        this.setMessage = { message: this.msg, msg: true };
      }
    })
  }
  registrationForm = this.fb.group({
    file: [null]
  })  
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://s3.amazonaws.com/f6s-public/profiles/1545337_th1.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;
  toppings = new FormControl();
  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
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
      this.router.navigate(['/users-list']);
   }

}