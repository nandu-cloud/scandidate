import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-oppuser',
  templateUrl: './add-oppuser.component.html',
  styleUrls: ['./add-oppuser.component.css']
})
export class AddOppuserComponent implements OnInit {

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
    this.router.navigate(['/orgnization-users-list']);
 }
}
