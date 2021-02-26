import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { BgvSearchService } from  '../../services/bgv-search.service' ;
import { StorageService} from '../../services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SendBgvReportDialogComponent } from '../send-bgv-report-dialog/send-bgv-report-dialog.component';
@Component({
  selector: 'app-bgv-search',
  templateUrl: './bgv-search.component.html',
  styleUrls: ['./bgv-search.component.css'],
  providers: [StorageService,BgvSearchService]
})
export class BGVSearchComponent implements  OnInit {
  public dataSource: any;
  displayedColumns : string[];
  bgvListSubscription : Subscription;
  editorganizationSubscription: Subscription;
  setMessage : any = {};
  searchForm: FormGroup;
  orgIdedit:number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  

  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private _storage: StorageService,private bgvService: BgvSearchService,private router:Router
   ) { 
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      dateOfBirth: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      adharNumber: new FormControl(''),
    })
   }

    ngOnInit() {
      this.displayedColumns = ['name','orgName','dob', 'contact', 'email','adharno', 'action', 'actions'];
    }

    search(){
      this.bgvListSubscription = this.bgvService.getAllBGVData(this.searchForm.value).subscribe(respObj => {
       console.log(respObj.data); 
       this.dataSource = new MatTableDataSource(respObj.data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    }


    showBGVReport(empId:number): void {
      const dialogRef = this.dialog.open(SendBgvReportDialogComponent, { width: '450px',height:'400px', 
      data: {
        id: empId
      }     
    });
    }



}
