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
import { ForwardToLinemanagerDialogComponent } from '../forward-to-linemanager-dialog/forward-to-linemanager-dialog.component';
import { AdminOrganizationService } from 'src/app/services/admin-organization.service';
import { elementAt } from 'rxjs/operators';
import { AssignToLinemanagerDialogComponent } from '../assign-to-linemanager-dialog/assign-to-linemanager-dialog.component';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
  providers: [EmployeeService, BgvSearchService, AdminOrganizationService]
})
export class CandidateListComponent implements OnInit {
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
  constructor(private formBuilder: FormBuilder,private router:Router,public empService: EmployeeService,
    private bgvService: BgvSearchService, public dialog: MatDialog, public linemanagerService: AdminOrganizationService) { }

  ngOnInit(): void {
    this.displayedColumns =['name', 'phone_number', 'email', 'dateOfJoining', 'dateofexit', 'experience', 'status', 'action', 'actions'];
    
    if(sessionStorage.getItem('subRole')=='LINE MANAGER'){
      this.getLinemanagerEmployeeData(sessionStorage.getItem('ID'))
      this.logiuser ="linemanager"
    }else if(sessionStorage.getItem('subRole')=='OPERATIONAL_USER' || sessionStorage.getItem('subRole')=='ADMIN'){
    this.logiuser ="admin"
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
  }
  // getEmployeeList() {
  //   this.displayedColumns =['name', 'phone_number', 'email', 'dateOfJoining', 'dateofexit', 'experience', 'status', 'action', 'actions'];
    
  //   if(sessionStorage.getItem('subRole')=='LINE MANAGER'){
  //     this.getLinemanagerEmployeeData(sessionStorage.getItem('ID'))
  //     this.logiuser ="linemanager"
  //   }else if(sessionStorage.getItem('subRole')=='OPERATIONAL_USER'){
  //   this.logiuser ="admin"
  //   this.EmployeeSubscription = this.empService.getEmployeeData().subscribe(respObj => {
  //     this.dataSource = new MatTableDataSource(respObj.data);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.filterPredicate = function(data, filter: string): boolean {
  //       return data.firstName.toLowerCase().includes(filter);
  //     };
  //   }, err => {
  //     this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
  //   })
  //   }
  // }

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
  // var dataa = 
  forwordToLinemanager(itm, i): void {
      const dialogRef = this.dialog.open(ForwardToLinemanagerDialogComponent,
         { width: '450px',height:'400px', data : {
             rowinfo : itm
         }
    }
    
    );
    dialogRef.componentInstance.employeeid = itm
    // console.log("gggggggggggggggggggggg", itm);
    dialogRef.afterClosed().subscribe( result => { 
      if (result){
        this.dataSource.data[i] = result;
      } 
      // this.dataSource.data = result;
    })
  }
  
    checkLinemanagerId(employeeid, itm){
      
       this.checkSubscription = this.linemanagerService.checkLinemanager(employeeid).subscribe(respObj => {
        // this.msgdata = respObj.message;
        const dialogRef = this.dialog.open(AssignToLinemanagerDialogComponent,
          { width: '350px', height: '200px', data: {
            rowinfo : itm,
            messagedata : respObj.message
          }
        }
          )
        console.log(respObj.message, "HELLOOO")
        // dialogRef.close()
        // if(respObj.flag == true) {
        //   // this.respObj.message = this.msgdata;
        //   this.msgdata = this.respObj.message;
        //   console.log(this.msgdata, "jjjjjjjjj")
        // }
       }
  
        )
    }

  getLinemanagerEmployeeData(id): void{
    this.LinemangerEmployeeSubscription = this.empService.getLinemanagerEmployeeData(id).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter);
      };
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    }) 
  }
}
