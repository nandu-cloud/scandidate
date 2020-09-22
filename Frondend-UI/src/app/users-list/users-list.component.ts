import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { UserListDataSource, UserListItem } from './user-list-datasource';
import { AppuserService } from '../services/appuser.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UserListItem>;
  setMessage: any = {};
  dataSource: MatTableDataSource<UserListItem>;
  public userSubscription: Subscription;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstName', 'role', 'subRole', 'email', 'phoneNumber', 'dateOfBirth', 'status', 'action'];

  constructor(
    private appuserService: AppuserService
  ) {}
  ngOnInit() {
    // this.dataSource = new UserListDataSource();
    this.getuserData()
  }

  getuserData(){
    this.appuserService.getUser().subscribe(respObj => {
      console.log(respObj)
      this.dataSource = new MatTableDataSource(respObj.data);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }
}
