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
