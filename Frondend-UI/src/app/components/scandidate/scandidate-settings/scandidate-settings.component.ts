import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators,FormControl, FormGroup } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../services/login.service';
import { AppuserService } from '../../../services/appuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scandidate-settings',
  templateUrl: './scandidate-settings.component.html',
  styleUrls: ['./scandidate-settings.component.css']
})
export class ScandidateSettingsComponent implements OnInit {
  userIdedit: number;
  settingForm: FormGroup;
  setMessage: { message: any; error: boolean; };
  error: any;
  baseUrl = environment.baseUrl;
  imageFilename: any;
  fileToUpload: File = null;
  userSubscription : Subscription;
  id;
  updateUserData: string;
  userupdateSubscription : Subscription;
  getData : any;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,private lService:LoginService,private appUserService : AppuserService
  ) {
    this.settingForm = new FormGroup({
      phoneNumber: new FormControl({value: '', disabled: false }),
      aboutMe: new FormControl({ value: '',disabled: false }),
      avatarLink: new FormControl({ value: '',disabled: false }),
    })
   }
   @ViewChild('fileInput') el: ElementRef;
   imageUrl: any = '';
   editFile: boolean = true;
   public profileSubscription : Subscription;
   openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
  }
  ngOnInit(): void {
    var userid = window.sessionStorage.getItem('ID');
    this.profileSubscription = this.lService.getUserById(userid).subscribe(resp => {
      this.settingForm.patchValue(resp.data);
      this.getData = resp.data;
      this.imageUrl=`${this.baseUrl}/public/user_avatar/${resp.data.avatarLink}`;
      console.log(this.imageUrl);
      this.imageFilename=resp.data.avatarLink;
    }, err => {
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    })
  }
  uploadFile(file: FileList) {
    this.fileToUpload = file.item(0);
    var render = new FileReader();
    render.onload = (event: any) => {
      // this.imageUrl = event.target.result;
    }
    render.readAsDataURL(this.fileToUpload);

    this.userSubscription = this.appUserService.postFile(this.fileToUpload).subscribe(
      data => {
        console.log(data.data.avatarLink);
        this.settingForm.patchValue({avatarLink: data.data.avatarLink});

        this.imageUrl = `${this.baseUrl}/public/user_avatar/${data.data.avatarLink}`;
        this.userSubscription = this.appUserService.deleteFile(this.imageFilename).subscribe();
      }
    )

  }
  save(id: number){
    this.updateUserData = window.sessionStorage.getItem('ID');
    this.userupdateSubscription = this.appUserService.updateUser(this.settingForm.value,this.getData).subscribe(resp => {
      console.log(resp.data);
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
  export class DialogElementsExampleDialog implements OnInit{
   
    Message: any;
    constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,private router:Router
      ) {
      }
  
      ngOnInit(){
      }
  
      close(){
        this.dialogRef.close(true);
        this.router.navigate(['/user-profile']);
     }
  
  }
