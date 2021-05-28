import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { addOrganizationService} from  '../../../../services/organization.service' ;
import { StorageService} from '../../../../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HrpartnerService } from '../../../../services/hrpartner.service';
@Component({
  selector: 'app-hr-partner-list',
  templateUrl: './hr-partner-list.component.html',
  styleUrls: ['./hr-partner-list.component.css']
})
export class HrPartnerListComponent implements OnInit {
  public dataSource: any;
  displayedColumns : string[];
  hrpartnerSubscription : Subscription;
  setMessage : any = {};
  createOrgData: FormGroup;
  edithrData: FormGroup;
  hrIdedit:number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private _storage: StorageService,
    private _orgService: addOrganizationService,
    private hrService: HrpartnerService,
    private router:Router) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'pName', 'contact', 'code', 'status', 'action'];
    this.hrpartnerSubscription = this.hrService.getHrPartnerData().subscribe(respObj => {
      this.dataSource = new MatTableDataSource(respObj.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        if(data.status == false){
          this.statusValue = 'Inactive';
        }else {
          this.statusValue = 'active';
        }
        return data.hrorganizationname.toLowerCase().includes(filter) || this.statusValue.toLowerCase().includes(filter);
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
  editData(id:number){
    this.hrIdedit = id;
    this.edithrData = this.formBuilder.group({
      _id:['', [Validators.required]],
    })
  }
}
