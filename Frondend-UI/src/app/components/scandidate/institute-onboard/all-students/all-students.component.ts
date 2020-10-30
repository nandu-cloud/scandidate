import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { addOrganizationService} from  '../../../../services/organization.service' ;
import { StorageService} from '../../../../services/storage.service';
import { instituteService } from '../../../../services/institute.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css'],
  providers: [StorageService,instituteService]
})
export class AllStudentsComponent implements OnInit {

  public dataSource: any;
  displayedColumns : string[];
  studentListSubscription : Subscription;
  editorganizationSubscription: Subscription;
  setMessage : any = {};
  searchForm: FormGroup;
  editstdData: FormGroup;
  stuIdedit:number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,private _storage: StorageService,private insService: instituteService,private router:Router
    ) { 
      this.searchForm = new FormGroup({
        firstName: new FormControl(''),
        yearOfPassout: new FormControl(''),
        phoneNumber: new FormControl(''),
        intitutionName: new FormControl(''),
      })
    }
 
     ngOnInit() {
      this.displayedColumns = ['name', 'roll', 'insName','email', 'phoneNumber', 'nameOfCourse'  ,'yoj','yop'];
     }
     search(){
      
       this.studentListSubscription = this.insService.getAllStudentData(this.searchForm.value).subscribe(respObj => {
        console.log(respObj.data); 
        this.dataSource = new MatTableDataSource(respObj.data);
         this.dataSource.paginator = this.paginator;
       }, err => {
         this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
       })
     }
}
