import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminOrganizationService } from 'src/app/services/admin-organization.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forward-to-linemanager-dialog',
  templateUrl: './forward-to-linemanager-dialog.component.html',
  styleUrls: ['./forward-to-linemanager-dialog.component.css'],
  providers: [EmployeeService]
})
export class ForwardToLinemanagerDialogComponent implements OnInit {
  displayedColumns : string[];
  getLinemanagerSubscription : Subscription;
  assignLinemanagerSubscription : Subscription;
  respObj: any;
  lm: any;
  id: any;
  error = '';
  setMessage: any = {};
  @Input() employeeid:any;
  constructor(public linemanagerService: AdminOrganizationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.employeeid._id);
    this.getLinemanagerSubscription = this.linemanagerService.getLinemanagerData()
    .subscribe(respObj => {
      this.lm = respObj.data;
    })
    console.log(this.lm.id);
    this.displayedColumns = ['name', 'action'];
  }
  methodtype;
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    });
    dialogRef.componentInstance.methodType = this.methodtype;
  }
  assignLinemanager(id: number) {
    let data = {
      // "firstName": this.employeeid.firstName,
      // "lastName": this.employeeid.lastName,
      // "phoneNumber": this.employeeid.phoneNumber,
      // "dateOfJoining": this.employeeid.phoneNumber,
      // "exitDate": this.employeeid.exitDate,
      // "professionalExperience": this.employeeid.professionalExperience,
      // "addedById": this.employeeid.addedById,
      // "organisationId": this.employeeid.organisationId,
      // "role": this.employeeid.role,
      // "email":this.employeeid.email,
      // "assignedId":this.employeeid.assignedId,
      // "status": "false"
    }
    this.assignLinemanagerSubscription = this.linemanagerService.assignLinemanager(this.employeeid._id, id, data).subscribe(resp => 
      { 
        this.methodtype = 'assign';
        this.openDialog();   
      }, err=> {
        this.setMessage = { message: err.error.message, error: true };
        this.error = this.setMessage.message;
        throw this.setMessage.message;
      })
  }
  close() {
    // this.dialogRef.close(true);
    // this.router.navigate(['/candidate-list']);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
})
export class DialogElementsExampleDialog {
  @Input() methodType: any
  Message: any;
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>, private router: Router
  ) {
    console.log(this.methodType)
  }

  ngOnInit() {
    console.log(this.methodType)
    if (this.methodType == 'assign') {
      this.Message = "Employee  Assigned successfully"
    } else if(this.methodType == 'save') {
      this.Message = "Employee Saved successfully"
    }
  }

  close() {
    this.dialogRef.close(true);
    // this.router.navigate(['/candidate-list']);
  }
}
