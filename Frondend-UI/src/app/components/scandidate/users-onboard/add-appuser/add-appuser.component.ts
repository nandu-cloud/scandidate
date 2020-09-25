import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators,FormControl, FormGroup } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { addOrganizationService } from '../../../../services/organization.service';
import { AppuserService } from '../../../../services/appuser.service';
import { instituteService } from '../../../../services/institute.service';
import { from, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-appuser',
  templateUrl: './add-appuser.component.html',
  styleUrls: ['./add-appuser.component.css']
})
export class AddAppuserComponent implements OnInit {
  createUserData: FormGroup;
  [x: string]: any;
  baseUrl = environment.baseUrl;
  teamSubscription$: any;
  userupdateSubscription: Subscription;
  edituserSubscription: Subscription;
  setMessage: any = {};
  msg: String; status: String;
  error = '';
  userDataaa: any;
  userIdedit: number;
  pagetype ='new';
  userIDddddd: any;
  updateUserData : number;
  imageUrl: any = '';
  imageFilename:string='';
  fileToUpload: File = null;
  id: any;
  constructor(
    public fb: FormBuilder, private router: Router,
    private cd: ChangeDetectorRef, public dialog: MatDialog,
    private appUserService: AppuserService, private route: ActivatedRoute,
    private Org: addOrganizationService,
    private Inst: instituteService
    ) {
      this.route.params.subscribe(params => {
          this.userIdedit = params.id;
      });
      this.createUserData = new FormGroup({
        _id: new FormControl(), 
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
    // let k = this.route.snapshot.params['id'];
      this.getallOrganizations();
      this.getInstitution();
      if(this.userIdedit){
        this.edituserSubscription = this.appUserService.getUserById(this.userIdedit).subscribe(respObj => {
          console.log(respObj.data);
          this.id = respObj.data._id;
        
          this.createUserData.patchValue(respObj.data);
          this.imageUrl = `${this.baseUrl}/public/user_avatar/${respObj.data.avatarLink}`;
          this.imageFilename = respObj.data.avatarLink;
        }, err => {
          this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
        })
      }

    }


  getuserDataByID(){

  }

  onupdate(id: number){
    this.updateUserData = id;
    // console.log(this.userIDddddd);
      // console.log(this.createUserData)
    this.userupdateSubscription = this.appUserService.editUser(this.createUserData.value).subscribe(resp => {
      this.openDialog();
      console.log("response Object", resp);
    // tslint:disable-next-line: no-unused-expression
    }), err => {
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    };
  }

  onSubmit(){
    if (!this.userIdedit) {

this.userSubscription = this.appUserService.createUserData(this.createUserData.value).subscribe(resp => {
  console.log(this.createUserData.value);
  this.openDialog();

    // tslint:disable-next-line: no-unused-expression
    }), err =>{
      this.setMessage = { message: err.error.message, error: true };
      this.eror = this.setMessage.message;
      throw this.setMessage.message;
    }

    }
  }
  registrationForm = this.fb.group({
    file: [null]
  })  

  methodtype;
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

 
  @ViewChild('fileInput') el: ElementRef;
  
  editFile: boolean = true;
  removeUpload: boolean = false;
  toppings = new FormControl();
  uploadFile(file: FileList) {
    this.fileToUpload = file.item(0);
    var render = new FileReader();
    render.onload = (event: any) => {
      // this.imageUrl = event.target.result;
    }
    render.readAsDataURL(this.fileToUpload);

    this.userSubscription = this.appUserService.postFile(this.fileToUpload).subscribe(
      data => {
        console.log(data.data.avatarLink);
        this.createUserData.patchValue({avatarLink: data.data.avatarLink});
      
        this.imageUrl = `${this.baseUrl}/public/user_avatar/${data.data.avatarLink}`;
        this.userSubscription = this.appUserService.deleteFile(this.imageFilename).subscribe();
      }
    )

  }




}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example.html',
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,private router:Router
    ) {
    }

    close(){
      this.dialogRef.close(true);
      this.router.navigate(['/users-list']);
   }

}
