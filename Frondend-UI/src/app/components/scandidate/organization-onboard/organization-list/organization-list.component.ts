import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { addOrganizationService} from  '../../../../services/organization.service' ;
import { StorageService} from '../../../../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css'],
  providers: [StorageService,addOrganizationService]
})
export class OrganizationListComponent implements  OnInit {
  public dataSource: any;
  displayedColumns : string[];
  organizationSubscription : Subscription;
  editorganizationSubscription: Subscription;
  setMessage : any = {};
  createOrgData: FormGroup;
  editOrgData: FormGroup;
  orgIdedit:number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,private _storage: StorageService,private _orgService: addOrganizationService,private router:Router
   ) { }

    ngOnInit() {
      this.displayedColumns = ['name', 'pName', 'contact', 'code', 'status', 'action'];
      this.organizationSubscription = this._orgService.getOrganizationData().subscribe(respObj => {
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
        id: 'organizationName',
        value: filterValue
      });
      this.dataSource.filter = JSON.stringify(tableFilters);
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }
    edit(id:number){
      this.orgIdedit = id;
      this.editOrgData = this.formBuilder.group({
        _id:['', [Validators.required]],
      })
    }

}
