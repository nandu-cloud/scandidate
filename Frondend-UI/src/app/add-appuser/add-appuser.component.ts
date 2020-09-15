import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators,FormControl } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-appuser',
  templateUrl: './add-appuser.component.html',
  styleUrls: ['./add-appuser.component.css']
})
export class AddAppuserComponent  {
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