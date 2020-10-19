import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
  providers: [EmployeeService]
})
export class CandidateListComponent implements OnInit {
  empIdedit: number;
  public dataSource: any;
  displayedColumns : string[];
  EmployeeSubscription : Subscription;
  setMessage: any = [];
  respObj : any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  editEmployeeData: FormGroup;

  constructor(private formBuilder: FormBuilder,private router:Router,public empService: EmployeeService) { }

  ngOnInit(): void {
    this.displayedColumns =['name', 'phone_number', 'email', 'dateOfJoining', 'dateofexit', 'experience', 'action'];
    this.EmployeeSubscription = this.empService.getEmployeeData().subscribe(respObj => {
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
      id: 'name',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
  edit(id:number){
    this.empIdedit = id;
    this.editEmployeeData = this.formBuilder.group({
      _id:['', [Validators.required]],
    })
  }
}
