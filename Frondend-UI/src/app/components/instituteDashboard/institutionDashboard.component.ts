import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import * as moment from 'moment';
import { from, Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './institutionDashboard.component.html',
  styleUrls: ['./institutionDashboard.component.css'],
  providers: [DashboardService]
})
export class InstitutionDashboardComponent implements OnInit {
  dashboardCount : Subscription;
  studentCount = '';
  candidateCount = '';
  bgvCount = '';
  constructor(private dService: DashboardService) {}
  ngOnInit() {
    this.dashboardCount = this.dService.getinstituteCount().subscribe(respObj => {
      console.log(respObj.data);
      this.studentCount = respObj.data.totalStudent;
      this.candidateCount = respObj.data.totalCandidate;
      this.bgvCount = respObj.data.totalBGV;
    });
  }
}

