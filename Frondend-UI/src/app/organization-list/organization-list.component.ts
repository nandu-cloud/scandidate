import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { addOrganizationService} from  '../services/addOrganization.service' ;
import { StorageService} from '../services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css'],
  providers: [StorageService,addOrganizationService]
})
export class OrganizationListComponent implements AfterViewInit, OnInit {
  public dataSource: any;
  displayedColumns : string[];
  organizationSubscription : Subscription;
  setMessage : any = {};
  createOrgData: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,private _storage: StorageService,private _orgService: addOrganizationService
   ) { }

    ngOnInit() {
      this.displayedColumns = ['name', 'pName', 'contact', 'code', 'status', 'action'];
      this.organizationSubscription = this._orgService.getOrganizationData().subscribe(respObj => {
        console.log(respObj)
        this.dataSource = new MatTableDataSource(respObj.data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
      // this.createOrgData = this.formBuilder.group({
      //   companyName: ['', [Validators.required, Validators.minLength(1)]],
      // });
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

}
