import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { InsitutionalListDataSource, InsitutionalListItem } from './insitutional-user-list-datasource';
import { AdministituteService } from '../../../../services/administitute.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-insitutional-user-list',
  templateUrl: './insitutional-user-list.component.html',
  styleUrls: ['./insitutional-user-list.component.css']
})
export class InsitutionalUserListComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<InsitutionalListItem>;
  dataSource: MatTableDataSource<InsitutionalListItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'institutename', 'active', 'contact', 'code', 'status', 'action'];

  userIdedit: number;
  updateUserData: FormGroup;
  edituserSubscription: Subscription;
 constructor(
   private instituteUser: AdministituteService,
   private formBuilder: FormBuilder
 ){
//   this.route.params.subscribe(params => {
//     this.userIdedit = params.id;
// });
 }
 
  ngOnInit() {
    this.get();
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
  get()
  {
  const k = localStorage.getItem('instutuinId')
  this.edituserSubscription = this.instituteUser.getUser(k).subscribe(respObj => {
    var dataRecords = respObj.data;
    console.log(respObj.data);
    this.dataSource = new MatTableDataSource(respObj.data);
    this.dataSource.paginator = this.paginator;
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
  })
}

edit(id:number){
  this.userIdedit = id;
  this.updateUserData = this.formBuilder.group({
    _id:['', [Validators.required]]
  })
}

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }
}
