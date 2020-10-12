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
         var dataRecords = respObj.data;
         this.dataSource.filterPredicate = 
          (data: typeof dataRecords, filtersJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filtersJson);

            filters.forEach(filter => {
              const val = data[filter.id] === null ? '' : data[filter.id];
              matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });
              return matchFilter.every(Boolean);
          };
       }, err => {
         this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
       })
     }
     applyFilter(filterValue: string) {
      const tableFilters = [];
      tableFilters.push({
        id: 'firstName',
        value: filterValue
      });
      this.dataSource.filter = JSON.stringify(tableFilters);
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }
     edit(id:number){
       this.stuIdedit = id;
       this.editstdData = this.formBuilder.group({
         _id:['', [Validators.required]],
       })
     }
}
