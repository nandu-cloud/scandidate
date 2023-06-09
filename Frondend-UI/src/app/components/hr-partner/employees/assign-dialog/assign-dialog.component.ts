import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminOrganizationService } from 'src/app/services/admin-organization.service';
import { CandidateForwardLinemanagerDialogComponent } from '../candidate-forward-linemanager-dialog/candidate-forward-linemanager-dialog.component';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialogComponent implements OnInit {
  
  lm: any;
  getLinemanagerSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public messagedata: any,
    @Inject(MAT_DIALOG_DATA) public rowinfo: any,
    public dialoge: MatDialogRef<AssignDialogComponent>,
    public linemanagerService: AdminOrganizationService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialoge.close()
    // this.router.navigate(['/candidate-list']);
  }
  forwordToLinemanager(): void {
    this.dialoge.close()
    const dialogRef = this.dialog.open(CandidateForwardLinemanagerDialogComponent,
       { width: '450px',height:'400px'
  }
  
  );
  dialogRef.componentInstance.employeeid = this.rowinfo.rowinfo
  console.log()
  dialogRef.afterClosed().subscribe( result => { 
    // this.dataSource.data = result;
  })
}
}
