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
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter);
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
    this.empIdedit = id;
    this.editEmployeeData = this.formBuilder.group({
      _id:['', [Validators.required]],
    })
  }
}
