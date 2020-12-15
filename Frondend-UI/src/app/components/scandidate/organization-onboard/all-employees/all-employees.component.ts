import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { addOrganizationService} from  '../../../../services/organization.service' ;
import { StorageService} from '../../../../services/storage.service';
import { StudentService} from '../../../../services/student.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css'],
  providers: [StorageService,StudentService]
})
export class AllEmployeesComponent implements OnInit {

  public dataSource: any;
  displayedColumns : string[];
  studentListSubscription : Subscription;
  editorganizationSubscription: Subscription;
  setMessage : any = {};
  searchForm: FormGroup;
  editstdData: FormGroup;
  stuIdedit:number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,private _storage: StorageService,private orgnization: addOrganizationService,private router:Router
    ) { 
      this.searchForm = new FormGroup({
        organizationName: new FormControl(''),
        firstName: new FormControl(''),
        email: new FormControl(''),
        phoneNumber: new FormControl(''),
      })
    }
 
     ngOnInit() {
       this.displayedColumns = ['name', 'roll', 'orgName','email', 'phoneNumber', 'department'  ,'exp'];
     }
     search(){
      this.studentListSubscription = this.orgnization.getAllEmployeeData(this.searchForm.value).subscribe(respObj => {
       console.log(respObj.data); 
       this.dataSource = new MatTableDataSource(respObj.data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }
}
