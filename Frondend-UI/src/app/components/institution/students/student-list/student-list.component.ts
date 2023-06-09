import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { addOrganizationService} from  '../../../../services/organization.service' ;
import { StorageService} from '../../../../services/storage.service';
import { StudentService} from '../../../../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  providers: [StorageService,StudentService]
})
export class StudentListComponent implements  OnInit {
  public dataSource: any;
  displayedColumns : string[];
  studentListSubscription : Subscription;
  editorganizationSubscription: Subscription;
  setMessage : any = {};
  createOrgData: FormGroup;
  editstdData: FormGroup;
  stuIdedit:number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,private _storage: StorageService,private stuService: StudentService,private router:Router
    ) { }
 
     ngOnInit() {
       this.displayedColumns = ['name', 'roll', 'email', 'phoneNumber', 'nameOfCourse', 'action'];
       this.studentListSubscription = this.stuService.getStudentData().subscribe(respObj => {
         this.dataSource = new MatTableDataSource(respObj.data);
         this.dataSource.paginator = this.paginator;
         this.dataSource.filterPredicate = function(data, filter: string): boolean {
          if(data.status == 'false'){
            this.statusValue = 'Inactive';
          }else {
            this.statusValue = 'active';
          }
          return data.firstName.toLowerCase().includes(filter) || this.statusValue.toLowerCase().includes(filter);
        };
       }, err => {
         this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
       })
     }
     applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
     edit(id:number){
       this.stuIdedit = id;
       this.editstdData = this.formBuilder.group({
         _id:['', [Validators.required]],
       })
     }
}
