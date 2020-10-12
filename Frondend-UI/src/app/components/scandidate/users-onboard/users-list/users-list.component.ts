import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { UserListDataSource, UserListItem } from './user-list-datasource';
import { AppuserService } from '../../../../services/appuser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  userIdedit: number;
  updateUserData: FormGroup;
  dataSource: MatTableDataSource<UserListItem>;
  public userSubscription: Subscription;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstName', 'role', 'subRole', 'email', 'phoneNumber', 'status', 'action'];

  constructor(
    private appuserService: AppuserService,
    private route: ActivatedRoute,public router:Router,
    private formBuilder: FormBuilder
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

  addd(){
    this.router.navigate(['add-appuser'], {
      queryParams: {
        a:'new',
      }
    })
  }

  edit(id:number){
    this.userIdedit = id;
    this.updateUserData = this.formBuilder.group({
      _id:['', [Validators.required]],
    })
  }
  // editUser(elemtnt){
  //   console.log(elemtnt)
  //  this.router.navigate(['add-appuser'], {
  //     queryParams: {
  //       a:'update',
  //      userr: elemtnt._id
  //     }
  //   })
  // }

  // itemid;
  // editt(itm){
  //   this.itemid= itm
  // }
  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }
}
