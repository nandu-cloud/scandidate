import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  cand_id: number;
  email: string;
  contact: number;
  dateofbirth: number;
  role: string;
  experience: number;
  reason: string;
  exit_date: number;
  terminated_by: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

  // { name: 'Ram', cand_id: 4654, email: 'hgfgf@gmail.com', contact: 98097978997, dateofbirth: 3-9-1998, role: 'Operational User',
  // experience: 2, reason: 'sfdfd', exit_date: 13-08-2020, terminated_by: 'employee'}
];

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'cand_id', 'email', 'contact', 'dateofbirth', 'role', 'experience', 'reason', 'exit_date', 'terminated_by', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'name',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
}
