import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators,FormControl, FormGroup } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { addOrganizationService } from '../services/addOrganization.service';
import { AppuserService } from '../services/appuser.service';
import { instituteService } from '../services/addInstitute.service';
@Component({
  selector: 'app-add-appuser',
  templateUrl: './add-appuser.component.html',
  styleUrls: ['./add-appuser.component.css']
})
export class AddAppuserComponent implements OnInit {
  createUserData: FormGroup;
  // [x: string]: any;
  teamSubscription$: any;
  setMessage: any = {};
  msg: String; status: String;
  userDataaa: any;
  pagetype ='new';
  userIDddddd: any;
  constructor(
    public fb: FormBuilder, private router: Router,
    private cd: ChangeDetectorRef, public dialog: MatDialog,
    private appUserService: AppuserService, private route: ActivatedRoute,
    private Org: addOrganizationService,
    private Inst: instituteService
    ) {
      this.createUserData = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        role: new FormControl(),
        subRole: new FormControl(),
        email: new FormControl(),
        dateOfBirth: new FormControl(),
        status: new FormControl(true),
        phoneNumber: new FormControl(),
        organizationId: new FormControl(),
        institutionId: new FormControl(),
        employeeId: new FormControl(),
        currentAddress: new FormControl(),
        permanentAddress: new FormControl(),
        noOfAssociatedUsers: new FormControl(),
        aboutMe: new FormControl(),
        avatarLink: new FormControl()
      })
      this.route.queryParams.subscribe(params => {
    //  console.log(params.id)
     if(params.a == 'new'){
      //  alert()
        this.pagetype = 'new'
        this.createUserData = new FormGroup({
          firstName: new FormControl(),
          lastName: new FormControl(),
          role: new FormControl(),
          subRole: new FormControl(),
          email: new FormControl(),
          dateOfBirth: new FormControl(),
          status: new FormControl(true),
          phoneNumber: new FormControl(),
          organizationId: new FormControl(),
          institutionId: new FormControl(),
          employeeId: new FormControl(),
          currentAddress: new FormControl(),
          permanentAddress: new FormControl(),
          noOfAssociatedUsers: new FormControl(),
          aboutMe: new FormControl(),
          avatarLink: new FormControl()
        })
      }else{
        // alert('hello')
        console.log(params.userr);
        this.userIDddddd = (params.userr)
        console.log(this.userIDddddd)
        this.pagetype = 'update'
        // this.userDataaa =JSON.parse(JSON.parse(JSON.stringify(params)).userr)
        console.log(this.userDataaa)
        this.getuserDataByID()
       
      }
    
    });
    }

    allOrganizations=[]
    getallOrganizations(){
      this.Org.getOrganizationData().subscribe(respObj => {
        this.allOrganizations = respObj.data;
      })

    }

    // tslint:disable-next-line: member-ordering
    allInstitutions=[]
    getInstitution(){
     this.Inst.getInstitutionList().subscribe(respObj => {
       this.allInstitutions = respObj.data;
     })
    }
  ngOnInit() {
      this.getallOrganizations()
      this.getInstitution()
  }


  getuserDataByID(){
    this.appUserService.getUserById(this.userIDddddd).subscribe(respObj => {
      console.log(respObj)
      this.createUserData = new FormGroup({
        firstName: new FormControl(respObj.data.firstName),
        lastName: new FormControl(respObj.data.lastName),
        role: new FormControl(respObj.data.role),
        subRole: new FormControl(respObj.data.subRole),
        email: new FormControl(respObj.data.email),
        dateOfBirth: new FormControl(respObj.data.dateOfBirth),
        status: new FormControl(respObj.data.status),
        phoneNumber: new FormControl(respObj.data.phoneNumber),
        organizationId: new FormControl(respObj.data.organizationId),
        institutionId: new FormControl(respObj.data.institutionId),
        employeeId: new FormControl(respObj.data.employeeId),
        currentAddress: new FormControl(respObj.data.currentAddress),
        permanentAddress: new FormControl(respObj.data.permanentAddress),
        noOfAssociatedUsers: new FormControl(respObj.data.noOfAssociatedUsers),
        aboutMe: new FormControl(respObj.data.aboutMe),
        avatarLink: new FormControl(respObj.data.avatarLink)
      })
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }

  onupdate(){
    if (this.createUserData.invalid) {
      return;
    }else{
      this.appUserService.editUser(this.createUserData.value,this.userIDddddd).subscribe(resp => {
      console.log("response Object ", resp);
      this.methodtype = 'Update'

      setTimeout(() => {
      this.openDialog();
        
      }, 300);
    })
  }
  }

  onSubmit(){
    // alert('submit')
    if (this.createUserData.invalid) {
      console.log(this.createUserData.value)
    // alert('invalid')

      return;
    }else{
    // alert('valid')

      this.appUserService.createUserData(this.createUserData.value).subscribe(resp => {
      console.log("response Object ", resp);
      if(resp.status == "SUCCESS"){
        this.methodtype = 'create'
        setTimeout(() => {
      this.openDialog();
          
        }, 300);
      }else{
        alert(resp.message)
      }
    })
  }
  }
  registrationForm = this.fb.group({
    file: [null]
  })  

  methodtype;
  openDialog() {
    // this.dialog.open(DialogElementsExampleDialog);

    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      // width: '350px',
      // data: { item }
    });
    dialogRef.componentInstance.methodType = this.methodtype;
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {

      } else {
        // this.getallAssntbasedonSub()
      }
    })
  }
  // openDialogBox() {
  //   this.dialog.open(DialogElementsExampleDialog);
  // }
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
export class DialogElementsExampleDialog implements OnInit {
  @Input() methodType:any;
  method:any;
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,private router:Router
    ) {
    }

    ngOnInit(){
      console.log(this.methodType)
      if(this.methodType == 'create'){
this.method="Operational User onboard Successfully"
      }else{
        this.method="Operational User Updated Successfully"

      }

    }
    close(){
      this.dialogRef.close(true);
      this.router.navigate(['/users-list']);
   }

}
