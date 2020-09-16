import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { InsitutionalListDataSource, InsitutionalListItem } from './insitutional-user-list-datasource';
@Component({
  selector: 'app-insitutional-user-list',
  templateUrl: './insitutional-user-list.component.html',
  styleUrls: ['./insitutional-user-list.component.css']
})
export class InsitutionalUserListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<InsitutionalListItem>;
  dataSource: InsitutionalListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'institutename', 'active', 'contact', 'code', 'status', 'action'];

  ngOnInit() {
    this.dataSource = new InsitutionalListDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
