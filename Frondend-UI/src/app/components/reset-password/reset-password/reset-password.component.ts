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
  constructor(public dialog: MatDialog,private router:Router) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
     this.router.navigate(['/login']);
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
