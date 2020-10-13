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
  inistutionGraph : Subscription;
  organizationGraph : Subscription;
  InistutionGraph : Subscription;
  points = [];
  month = [];
  Inistutionpoints = [];
  InistutionMonth = [];
  OrggraphData = {
    "fromDate":"Wed Jan 20 2020 00:00:00 GMT+0530 (India Standard Time)",
    "toDate":new Date(),
    "filter":"MONTH"
}
InsgraphData = {
  "fromDate":"Wed Jan 20 2020 00:00:00 GMT+0530 (India Standard Time)",
    "toDate":new Date(),
    "filter":"MONTH"
}
  constructor(private dService: DashboardService) {}
  @ViewChild('myCanvas')
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;

  @ViewChild('myCanvas1')
  public canvas1: ElementRef;
  public context1: CanvasRenderingContext2D;
  public chartType1: string = 'line';
  public chartData1: any[];
  public chartLabels1: any[];
  public chartColors1: any[];
  public chartOptions1: any;

  ngOnInit() {
    this.dashboardCount = this.dService.getinstituteCount().subscribe(respObj => {
      console.log(respObj.data);
      this.studentCount = respObj.data.totalStudent;
      this.candidateCount = respObj.data.totalCandidate;
      this.bgvCount = respObj.data.totalBGV;
    });

    this.organizationGraph = this.dService.organizationGraph(this.OrggraphData).subscribe(respObj => {
      console.log(respObj);
      for(var i=0;respObj.data.length > i;i++){
        let count = respObj.data[i].total;
        let mon = respObj.data[i]._id.month;
        this.points.push(count);
        var monthName = moment(mon, 'M').format('MMM');
        this.month.push(monthName);
      }

    this.chartData = [{
      data: this.points,
      label: 'organization',
      fill: false
    }];
    this.chartLabels = this.month;
    this.chartColors = [{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
         borderColor: 'rgba(108, 180, 9, 1)'
    }];
    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      },
      annotation: {
         drawTime: 'beforeDatasetsDraw',
         annotations: [{
            type: 'box',
            id: 'a-box-1',
            yScaleID: 'y-axis-0',
            yMin: 0,
            yMax: 1,
            backgroundColor: '#4cf03b'
         }, {
            type: 'box',
            id: 'a-box-2',
            yScaleID: 'y-axis-0',
            yMin: 1,
            yMax: 2.7,
            backgroundColor: '#fefe32'
         }, {
            type: 'box',
            id: 'a-box-3',
            yScaleID: 'y-axis-0',
            yMin: 2.7,
            yMax: 5,
            backgroundColor: '#fe3232'
         }]
      }
    }
    });

    // Inistution Graph

    this.InistutionGraph = this.dService.inistutionGraph(this.InsgraphData).subscribe(respObj => {
      console.log(respObj);
      for(var i=0;respObj.data.length > i;i++){
        let count1 = respObj.data[i].total;
        let mon1 = respObj.data[i]._id.month;
        this.Inistutionpoints.push(count1);
        var monthName = moment(mon1, 'M').format('MMM');
        this.InistutionMonth.push(monthName);
      }
  this.chartData1 = [{
    data: this.Inistutionpoints,
    label: 'Insitution',
    fill: false
  }];
  this.chartLabels1 =  this.InistutionMonth;
  this.chartColors1 = [{
    backgroundColor: 'rgba(1, 1, 1, 0.2)',
       borderColor: 'rgba(108, 180, 9, 1)'
  }];
  this.chartOptions1 = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    },
    annotation: {
       drawTime: 'beforeDatasetsDraw',
       annotations: [{
          type: 'box',
          id: 'a-box-1',
          yScaleID: 'y-axis-0',
          yMin: 0,
          yMax: 1,
          backgroundColor: '#4cf03b'
       }, {
          type: 'box',
          id: 'a-box-2',
          yScaleID: 'y-axis-0',
          yMin: 1,
          yMax: 2.7,
          backgroundColor: '#fefe32'
       }, {
          type: 'box',
          id: 'a-box-3',
          yScaleID: 'y-axis-0',
          yMin: 2.7,
          yMax: 5,
          backgroundColor: '#fe3232'
       }]
    }
  }
})
};
  
}

