import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-insitutional-user',
  templateUrl: './add-insitutional-user.component.html',
  styleUrls: ['./add-insitutional-user.component.css']
})
export class AddInsitutionalUserComponent  {
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,public dialog: MatDialog
  ) {}

  registrationForm = this.fb.group({
    file: [null]
  })  
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  ngOnInit(): void {
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
    this.router.navigate(['/insitution-users-list']);
 }
}