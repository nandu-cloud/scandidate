import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { from, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { BgvSearchService } from 'src/app/services/bgv-search.service';
import { MatDialog } from '@angular/material/dialog';
import { SendBgvReportDialogComponent } from 'src/app/components/send-bgv-report-dialog/send-bgv-report-dialog.component';
@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
  providers: [EmployeeService, BgvSearchService]
})
export class CandidateListComponent implements OnInit {
  empIdedit: number;
  public dataSource: any;
  displayedColumns : string[];
  EmployeeSubscription : Subscription;
  createbgvSubscription: Subscription;
  setMessage: any = [];
  respObj : any = [];
  // showEdit : boolean = true;
  // saveNow : boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  editEmployeeData: FormGroup;
  empIdsave: number;

  constructor(private formBuilder: FormBuilder,private router:Router,public empService: EmployeeService,
    private bgvService: BgvSearchService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayedColumns =['name', 'phone_number', 'email', 'dateOfJoining', 'dateofexit', 'experience', 'status', 'action', 'actions'];
    this.EmployeeSubscription = this.empService.getEmployeeData().subscribe(respObj => {
      this.dataSource = new MatTableDataSource(respObj.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter);
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
