import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactusService } from '../../services/contactus.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactSubscription: Subscription;
  contactForm : FormGroup;
  setMessage: any = {};
  msg: String; status: String;
  error = '';

  constructor(
    public contactService: ContactusService,
    public dialog: MatDialog
  ) {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
      designation: new FormControl(''),
      organization: new FormControl('', [Validators.required]),
      enquiry: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
  }
  methodtype;
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    });
    dialogRef.componentInstance.methodType = this.methodtype;
  }

  onSubmit(){
      this.contactSubscription = this.contactService.createContact(this.contactForm.value).subscribe(resp => {
        console.log(this.contactForm.value);
        this.methodtype="save";
        this.openDialog();
      }, err =>{
        this.setMessage = { message: err.error.message, error: true };
        this.error = this.setMessage.message;
        throw this.setMessage.message;
    })
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
})
export class DialogElementsExampleDialog {
 @Input() methodType: any
 Message: any;
 constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>, private router: Router) {

 }
 ngOnInit() {
  if (this.methodType == 'save') {
    this.Message = "Thank you for contacting us, email sent sucessfully"
  } 
 }
 close() {
  // this.dialogRef.close(true);
  this.router.navigate(['/landing-page']);
}
}