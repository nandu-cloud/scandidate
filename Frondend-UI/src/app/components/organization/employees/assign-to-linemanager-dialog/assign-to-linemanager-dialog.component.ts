import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminOrganizationService } from 'src/app/services/admin-organization.service';
import { ForwardToLinemanagerDialogComponent } from '../forward-to-linemanager-dialog/forward-to-linemanager-dialog.component';

@Component({
  selector: 'app-assign-to-linemanager-dialog',
  templateUrl: './assign-to-linemanager-dialog.component.html',
  styleUrls: ['./assign-to-linemanager-dialog.component.css']
})
export class AssignToLinemanagerDialogComponent implements OnInit {
  

  lm: any;
  getLinemanagerSubscription: Subscription;

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public messagedata: any,
    @Inject(MAT_DIALOG_DATA) public rowinfo: any,
    public dialoge: MatDialogRef<AssignToLinemanagerDialogComponent>,
    public linemanagerService: AdminOrganizationService) { }

  ngOnInit(): void {
      // console.log()
      // this.getLinemanagerSubscription = this.linemanagerService.getLinemanagerData()
      // .subscribe(respObj => {
      //   this.lm = respObj.data;
      // })
  }
  close() {
    this.dialoge.close()
    // this.router.navigate(['/candidate-list']);
  }
forwordToLinemanager(): void {
      this.dialoge.close()
      const dialogRef = this.dialog.open(ForwardToLinemanagerDialogComponent,
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
