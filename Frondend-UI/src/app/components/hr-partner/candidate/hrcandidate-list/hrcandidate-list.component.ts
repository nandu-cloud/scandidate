import { AfterViewInit, Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { BgvSearchService } from 'src/app/services/bgv-search.service';
import { MatDialog } from '@angular/material/dialog';
import { SendBgvReportDialogComponent } from 'src/app/components/send-bgv-report-dialog/send-bgv-report-dialog.component';
// import { ForwardToLinemanagerDialogComponent } from '../forward-to-linemanager-dialog/forward-to-linemanager-dialog.component';
import { AdminOrganizationService } from 'src/app/services/admin-organization.service';
import { elementAt } from 'rxjs/operators';
import { ExEmployeeService } from '../../service/ex-employee.service';
// import { AssignToLinemanagerDialogComponent } from '../assign-to-linemanager-dialog/assign-to-linemanager-dialog.component';

@Component({
  selector: 'app-hrcandidate-list',
  templateUrl: './hrcandidate-list.component.html',
  styleUrls: ['./hrcandidate-list.component.css']
})
export class HrcandidateListComponent implements OnInit {
  empIdedit: number;
  public dataSource: any;
  displayedColumns : string[];
  EmployeeSubscription : Subscription;
  createbgvSubscription: Subscription;
  getLinemangerSubscription: Subscription;
  LinemangerEmployeeSubscription: Subscription;
  checkSubscription: Subscription;
  setMessage: any = [];
  respObj : any = [];
  data1 : any;
  msgdata : any;
  msgdataa : any;
  // showEdit : boolean = true;
  // saveNow : boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() passedEvent = new EventEmitter();
  editEmployeeData: FormGroup;
  empIdsave: number;
  logiuser:any
  exempService: any;

  constructor(
    private formBuilder: FormBuilder,private router:Router,public empService: ExEmployeeService,
    private bgvService: BgvSearchService, public dialog: MatDialog, public linemanagerService: AdminOrganizationService
  ) { }

  ngOnInit(): void {
    this.displayedColumns =['name', 'phone_number', 'email', 'experience', 'action', 'actions'];
    this.EmployeeSubscription = this.empService.getCandidateList().subscribe(respObj=>{
      this.dataSource = new MatTableDataSource(respObj.data);
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  edit(id:number){
    console.log("completed record");
    this.empIdedit = id;
    this.editEmployeeData = this.formBuilder.group({
      _id:['', [Validators.required]],
    })
  }
  saveRow(id:number){
    console.log("save now record");
    this.empIdsave = id;
    this.editEmployeeData = this.formBuilder.group({
      _id:['', [Validators.required]],
    })
  }

  showBGVReport(id): void {
    this.createbgvSubscription = this.bgvService.createbgvreport(id).subscribe((resp: any) => {
      const dialogRef = this.dialog.open(SendBgvReportDialogComponent, { width: '450px',height:'400px', 
      data: {
        // id: empId
        fileName: resp.originalFileName
      }     
    });
    })
 
  }

}
