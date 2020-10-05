import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators,FormControl, FormGroup } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  implements OnInit {
  setMessage: { message: any; error: boolean; };
  error: any;
  profileForm : FormGroup;
  baseUrl = environment.baseUrl;
  imageFilename: any;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog,private lService:LoginService
  ) {
    this.profileForm = new FormGroup({
      firstName: new FormControl({value: '', disabled: true }),
      lastName: new FormControl({value: '', disabled: true }),
      email: new FormControl({value: '', disabled: true }),
      phoneNumber: new FormControl({value: '', disabled: true }),
      permanentAddress: new FormControl({value: '', disabled: true }),
      aboutMe: new FormControl({ value: '',disabled: true }),
      avatarLink: new FormControl({ value: '',disabled: true }),
      employeeId: new FormControl({ value: '',disabled: true })
    })
  }

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = '';
  editFile: boolean = true;
  public profileSubscription : Subscription;
ngOnInit(){
    var userid = window.sessionStorage.getItem('ID');
    this.profileSubscription = this.lService.getUserById(userid).subscribe(resp => {
      this.profileForm.patchValue(resp.data);
      this.imageUrl=`${this.baseUrl}/public/user_avatar/${resp.data.avatarLink}`;
      this.imageFilename=resp.data.avatarLink;
    }, err => {
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    })
  }
}

