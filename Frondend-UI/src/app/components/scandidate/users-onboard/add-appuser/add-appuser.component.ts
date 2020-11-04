import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators,FormControl, FormGroup } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { addOrganizationService } from '../../../../services/organization.service';
import { AppuserService } from '../../../../services/appuser.service';
import { instituteService } from '../../../../services/institute.service';
import { from, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../../../services/storage.service';
@Component({
  selector: 'app-add-appuser',
  templateUrl: './add-appuser.component.html',
  styleUrls: ['./add-appuser.component.css'],
  providers: [ addOrganizationService,StorageService,AppuserService ]
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
  selectedValue: any;
  id: any;
  organizationId: null;
  institutionId: null;
  constructor(
    public fb: FormBuilder, private router: Router,
    private cd: ChangeDetectorRef, public dialog: MatDialog,
    private appUserService: AppuserService, private route: ActivatedRoute,
    private Org: addOrganizationService,
    private Inst: instituteService,
    ) {
      this.route.params.subscribe(params => {
          this.userIdedit = params.id;
      });
      this.createUserData = new FormGroup({
        _id: new FormControl(), 
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        role: new FormControl('', [Validators.required]),
        subRole: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email,
                            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        dateOfBirth: new FormControl('', [Validators.required]),
        status: new FormControl(true, [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
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
    registrationForm = this.fb.group({
      file: [null]
    })
    methodtype;
    openDialog() {
      const dialogRef = this.dialog.open(DialogElementsExampleDialog,{
    });
      dialogRef.componentInstance.metrhodType = this.methodtype;
    }
   
    @ViewChild('fileInput') el: ElementRef;
    allOrganizations=[]
    getallOrganizations(){
      this.Org.getOrganizationData().subscribe(respObj => {
        this.allOrganizations = respObj.data;
      })

    }
    allInstitutions=[]
    getInstitution(){
     this.Inst.getInstitutionList().subscribe(respObj => {
       this.allInstitutions = respObj.data;
     })
    }

  ngOnInit() {
    this.getallOrganizations();
    this.getInstitution();
    if (this.userIdedit){
        this.edituserSubscription = this.appUserService.getUserById(this.userIdedit).subscribe(respObj => {
          console.log(respObj.data);
          this.id = respObj.data._id;
          this.createUserData.patchValue(respObj.data);
          this.imageUrl = `${this.baseUrl}/public/user_avatar/${respObj.data.avatarLink}`;
          this.imageFilename = respObj.data.avatarLink;
          const obj = {
            value: respObj.data.role
          }
          this.selectedTpe(obj);
        }, err => {
          this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
        })
      }
    }
    subroleTypeee;
    selectedTpe(evt){
      console.log(evt)
      if(evt.value =='SCANDIDATE'){
        this.subroleTypeee="SCANDIDATE"
      }else if(evt.value =='ORGANIZATION'){
        this.subroleTypeee="ORGANIZATION";
      }else{
        this.subroleTypeee="INSTITUTZON"
      }
    }
  onupdate(id: number){
    if( this.createUserData.valid){
    this.updateUserData = id;
    this.userupdateSubscription = this.appUserService.editUser(this.createUserData.value).subscribe(resp => {
    this.methodtype="update"
    this.openDialog();
    }, err => {
      this.setMessage = { message: err.error.message, error: true };
      this.error = this.setMessage.message;
      throw this.setMessage.message;
    });
  }
  }

  onSubmit(){
    if(!this.userIdedit){
      this.userSubscription = this.appUserService.createUserData(this.createUserData.value).subscribe(resp => {
        console.log(this.createUserData.value);
        this.methodtype="create";
        this.openDialog();
      }, err =>{
        this.eror = this.setMessage.message;
        this.setMessage = { message: err.error.message, error: true };
        throw this.setMessage.message;
    })
    }
  }
 
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
export class DialogElementsExampleDialog implements OnInit{
  @Input() metrhodType: any
  Message: any;
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>,private router:Router
    ) {
      console.log(this.metrhodType)
    }

    ngOnInit(){
      console.log(this.metrhodType)
      if(this.metrhodType == 'update'){
        this.Message="Users onboarded Updated successfully"
      }else{
        this.Message="Users onboarded Created successfully"

      }
    }

    close(){
      this.dialogRef.close(true);
      this.router.navigate(['/users-list']);
   }

}
