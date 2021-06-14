import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import * as moment from 'moment';
import { from, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-hrpartnerdashboard',
  templateUrl: './hrpartnerdashboard.component.html',
  styleUrls: ['./hrpartnerdashboard.component.css'],
  providers: [DashboardService]
})
export class HrpartnerdashboardComponent implements OnInit {
  dashboardCount : Subscription;
  employeeCount = '';
  candidateCount = '';
  bgvCount = '';
  institutionsCount = '';
  organizationsCount = '';
  constructor(private dService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardCount = this.dService.getHrpartnerCount().subscribe(respObj => {
      console.log(respObj.data);
      this.employeeCount = respObj.data.totalEmployee;
      this.candidateCount = respObj.data.totalCandidate;
      this.bgvCount = respObj.data.totalBGV;
    });
    this.dashboardCount = this.dService.gettotalCount().subscribe(respObj => {
      console.log(respObj.data);
      this.institutionsCount = respObj.data.institutionsCount;
      this.organizationsCount = respObj.data.organizationsCount;
    });
  }

}
