import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
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

    this.chartData = [{
      data: [0, 1, 6, 2, 5,7,0,9,2,5,0,9],
      label: 'organization',
      fill: false
    }];
    this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
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
  this.chartData1 = [{
    data: [3, 1, 4, 2, 5,2,0,9,4,1,0,9],
    label: 'Insitution',
    fill: false
  }];
  this.chartLabels1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
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
};
}

