import { Component ,OnInit,Input,Output} from '@angular/core';
import { Validators,FormControl,FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [LoginService, StorageService]
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  resetForm : FormGroup;
  public setMessage: any = {};
  error :string= '';
  resetSubscription : Subscription;
  close(){
    setTimeout(() => {
      this.error='';
     }, 100);
     this.resetForm.reset();
  }
  
  constructor(public dialog: MatDialog,private router:Router ,private _loginService:LoginService) { 
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
     this.router.navigate(['/login']);
    });
  }
  onSubmit(){
    if (this.resetForm.invalid) {
      return;
    }
    this.resetSubscription = this._loginService.resetPassword(this.resetForm.value).subscribe(resp => {
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
