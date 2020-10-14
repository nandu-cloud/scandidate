import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminOrganizationService } from '../../../../../services/admin-organization.service';

@Component({
  selector: 'app-organization-users-list',
  templateUrl: './organization-users-list.component.html',
  styleUrls: ['./organization-users-list.component.css'],
  providers: [ AdminOrganizationService ]
})
export class OrganizationUsersListComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder,private router:Router,public orgUserService: AdminOrganizationService) { }

  ngOnInit() {
    this.displayedColumns = ['userName', 'phoneNumber', 'email', 'role', 'subRole', 'status' ,'action'];
    this.organizationAdminSubscription = this.orgUserService.getOrganizationUserList().subscribe(respObj => {
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
    this.orgIdedit = id;
    this.editOrgData = this.formBuilder.group({
      _id:['', [Validators.required]],
    })
  }

}
