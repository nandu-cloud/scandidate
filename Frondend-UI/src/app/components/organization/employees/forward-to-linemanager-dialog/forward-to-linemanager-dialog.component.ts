import { Component, Inject, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminOrganizationService } from 'src/app/services/admin-organization.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
declare var $:any
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
  lm: any = [];
  id: any;
  data1: any;
  error = '';
  setMessage: any = {};
  dataa : any;
  assignnLinemanager: FormGroup;
  @Input() employeeid:any;
  router: any;
  dataSource: any;
  constructor(public linemanagerService: AdminOrganizationService, public dialog: MatDialog, public empService: EmployeeService,
    public dialogg: MatDialogRef<ForwardToLinemanagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public rowinfo: any) { 
    this.assignnLinemanager = new FormGroup({
      linemanager: new FormControl('')
    })
  }

  ngOnInit(): void {
    console.log(this.rowinfo);
    console.log(this.employeeid._id);
    this.getLinemanagerSubscription = this.linemanagerService.getLinemanagerData()
    .subscribe(respObj => {
      this.lm = respObj.data;
    })
    
    // this.displayedColumns = ['name', 'action'];
  }

  getcompanyid(id) {
    this.data1 = id;
    console.log('hiii'+ this.data1);
  }
  methodtype;
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    });
    dialogRef.componentInstance.methodType = this.methodtype;
  }
  assignLinemanager() {
  //   $('ul').on('click', '.click_me', function(){
  //     $(this).toggleClass('active').siblings().removeClass('active');   // <--- The trick!
  // })
// document.getElementById(i).style.background="red"
// document.getElementById(JSON.stringify(i-1)).classList.remove("mystyle");
// $('.click_me').click(function() {
//   $('.active').not(this).removeClass('active');
//   $(this).toggleClass('active');
// });
console.log(this.employeeid)
if(this.employeeid.firstName == ''  || this.employeeid.lastName == '' || this.employeeid.dateOfJoining == '' || this.employeeid.exitDate == '' || this.employeeid.phoneNumber == '' || this.employeeid.email == ''){
  this.methodtype = 'empty';
  this.openDialog()
}else{

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
    
    this.assignLinemanagerSubscription = this.linemanagerService.assignLinemanager(this.employeeid._id, this.data1, data).subscribe(resp => 
      { 
        // this.dataSource
        if(resp.status == 409){
        this.methodtype = 'already Assiged';
        }else{
          // this.dataa = resp.data;
         
        // this.linemanagerService.assignLinemanager
        // window.location.reload();
        // this.router.navigate(['/candidate-list'])
        this.rowinfo.rowinfo.assignedId = resp.data.assignedId
        // this.data1 = resp.data.assignedId;
        this.methodtype = 'assign';
        this.dialogg.close(this.rowinfo);      
       }
        // this.openDialog();   
      }, err=> {
        this.setMessage = { message: err.error.message, error: true };
        this.error = this.setMessage.message;
        throw this.setMessage.message;
      })
    }
  }
  close() {
    // this.dialogRef.close(true);
    this.router.navigate(['/candidate-list']);
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
    if (this.methodType == 'already Assiged') {
      this.Message = "Already Assiged"
    } else if(this.methodType == 'assign') {
      this.Message = "Assigned – Manager"
    }else if(this.methodType == 'empty'){
      this.Message = "Please Fill all required fields in Personal Information tab"
    }
  }

  close() {
    this.dialogRef.close(true);
    // this.router.navigate(['/candidate-list']);
  }
}
