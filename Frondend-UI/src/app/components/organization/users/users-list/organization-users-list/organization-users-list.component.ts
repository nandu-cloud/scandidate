import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-users-list',
  templateUrl: './organization-users-list.component.html',
  styleUrls: ['./organization-users-list.component.css']
})
export class OrganizationUsersListComponent implements OnInit {
  public dataSource: any;
  displayedColumns : string[];
  organizationSubscription : Subscription;
  editorganizationSubscription: Subscription;
  setMessage : any = {};
  createOrgData: FormGroup;
  editOrgData: FormGroup;
  orgIdedit:number;
  respObj : any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.displayedColumns = ['userName', 'phone', 'email', 'address', 'department', 'status' ,'action'];
    this.respObj = [
      { userName: 'Himaja', phone: 7789876789, email: 'him@gmail.com', address: 'D24J', department: 'IT', status:'Active'},
      { userName: 'Theja', phone: 7789876789, email: 'him@gmail.com', address: 'D24J', department: 'IT', status:'Active'},
      { userName: 'Murali', phone: 7789876789, email: 'him@gmail.com', address: 'D24J', department: 'IT', status:'Active'},
      { userName: 'Jessu', phone: 7789876789, email: 'him@gmail.com', address: 'D24J', department: 'IT', status:'Active'},
      { userName: 'Tharak', phone: 7789876789, email: 'him@gmail.com', address: 'D24J', department: 'IT', statu:'Active'}
    
    ];
      this.dataSource = new MatTableDataSource(this.respObj);
      this.dataSource.paginator = this.paginator;
 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}
