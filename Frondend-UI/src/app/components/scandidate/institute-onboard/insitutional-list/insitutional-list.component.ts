import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { instituteService } from '../../../../services/institute.service';
import { StorageService } from '../../../../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-insitutional-list',
  templateUrl: './insitutional-list.component.html',
  styleUrls: ['./insitutional-list.component.css'],
  providers: [StorageService, instituteService]
})

export class InsitutionalListComponent implements OnInit {
  public dataSource: any;
  displayedColumns: string[];
  instituteSubscription: Subscription;
  setMessage: any = {};
  createOrgData: FormGroup;
  msg:string;
  statusValue : any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private _storage: StorageService,
    private _instituteService: instituteService
  ) { }
 
  ngOnInit() {
    this.displayedColumns = ['name', 'pName', 'contact', 'code', 'status', 'action'];
      this.instituteSubscription = this._instituteService.getInstitutionList().subscribe(respObj => {
      console.log(respObj)
      this.msg=respObj.message;
      this.dataSource = new MatTableDataSource(respObj.data);
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        if(data.status == false){
          this.statusValue = 'Inactive';
        }else {
          this.statusValue = 'active';
        }
        return data.instituteName.toLowerCase().includes(filter) || this.statusValue.toLowerCase().includes(filter);
      };
      this.dataSource.paginator = this.paginator;
      
    }, err => {
      this.setMessage = { message: this.msg, error: true };
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
