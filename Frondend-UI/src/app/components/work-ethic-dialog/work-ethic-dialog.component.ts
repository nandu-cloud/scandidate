import { Input } from '@angular/core';
import { Component, ChangeDetectorRef, ElementRef, ViewChild ,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { BgvSearchService } from  '../../services/bgv-search.service' ;
import { from, Subscription } from 'rxjs';


@Component({
  selector: 'app-work-ethic-dialog',
  templateUrl: './work-ethic-dialog.component.html',
  styleUrls: ['./work-ethic-dialog.component.css'],
  providers:[BgvSearchService]
})
export class WorkEthicDialogComponent implements OnInit {

  editEmployeeSubscription : Subscription;
  empIdedit: any;
  data;
  public setMessage: any = {};

  constructor(
    public empService : BgvSearchService,
  ) { 
 
  }

  ngOnInit(): void {
 
      this.editEmployeeSubscription = this.empService.ViewCandidate(this.empIdedit).subscribe(respObj => {
        console.log(respObj.data);
      
            for (let i = 0; i < this.data.length; i++) {
              if(this.data[i].organizationId)
              {
              }
            }
          

         
        
      }, err => {
        this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
      })
    
  
    
  }
  
  
}
