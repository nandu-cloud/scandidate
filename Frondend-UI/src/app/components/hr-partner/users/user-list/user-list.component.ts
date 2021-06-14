import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExEmployeeService } from '../../service/ex-employee.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [ExEmployeeService]
})
export class UserListComponent implements OnInit {
  public dataSource: any;
  displayedColumns : string[];
  organizationAdminSubscription : Subscription;
  editorganizationSubscription: Subscription;
  setMessage : any = {};
  createOrgData: FormGroup;
  editOrgData: FormGroup;
  orgIdedit:number;
  respObj : any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private router:Router,
    public empService: ExEmployeeService) { }

  ngOnInit(): void {
    this.displayedColumns = ['userName', 'phoneNumber', 'email', 'role', 'subRole', 'status' ,'action'];
    this.organizationAdminSubscription = this.empService.getOrganizationUserList().subscribe(respObj => {
      this.dataSource = new MatTableDataSource(respObj.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        if(data.status == false){
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
    this.orgIdedit = id;
    this.editOrgData = this.formBuilder.group({
      _id:['', [Validators.required]],
    })
  }
}
