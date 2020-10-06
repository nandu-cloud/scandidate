import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { InsitutionalListDataSource, InsitutionalListItem } from './insitutional-user-list-datasource';
import { AdministituteService } from '../../../../services/administitute.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-insitutional-user-list',
  templateUrl: './insitutional-user-list.component.html',
  styleUrls: ['./insitutional-user-list.component.css']
})
export class InsitutionalUserListComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<InsitutionalListItem>;
  dataSource: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'institutename', 'active', 'contact', 'code', 'status', 'action'];
  route: any;
  userIdedit: number;
  edituserSubscription: Subscription;
 constructor(
   private instituteUser: AdministituteService
 ){
//   this.route.params.subscribe(params => {
//     this.userIdedit = params.id;
// });
 }
  ngOnInit() {
    // this.dataSource = new InsitutionalListDataSource();
 
    this.get()
 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  get()
{
  const k = localStorage.getItem('instutuinId')
  this.edituserSubscription = this.instituteUser.getUser(k).subscribe(respObj => {
    console.log(respObj.data);
    this.dataSource = new MatTableDataSource(respObj.data);
    this.dataSource.paginator = this.paginator;
  })
}
  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }
}
