import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  name1 : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Today, an employee’s background is verified after offer acceptance or more likely, after joining', name1:'On-click, anytime you need to check the background'},
  {name:'During the recruitment process, prior to the background check process, we check the resume, social media profiles, references – everything is provided by the candidate!', name1:'Past employer and institutes provide the information – it can be checked any time, even before you interview the candidate.'},
  {name:'Organizations spend a minimum of Rs. 2000 on plain vanilla background checks; junior level background check may be ignored due to high costs; costs rise for senior positions',name1:'Standard flat rate of Rs. 1000 for detailed insights on your candidate’s credentials – affordable for universal usage across levels'},
  {name:'A typical BGV has red / yellow / green attributes that are typically binary facts presented',name1:'SCANDIDATE reports present detailed never-before structured insights on Work Ethic, Merit, Values – no other process today gives this data directly from the source i.e. either HR at the time of exit or Reporting Manager'},
  {name:'A BGV report captures data from the ex-employer much after the employee has left',name1:'SCANDIDATE data is captured at the time of exit – thus ensuring no information loss due to passage of time or changes in people '},
  {name:'A Background check process also does not capture any ex-employer period the candidate may want to “hide”',name1:'SCANDIDATE ensures any period of employment, however short or long, will be fed into the system for future reference'},
  {name:'Loss of customer credibility due to late verification of onboarded employees – reputation loss, motivation loss, monetary loss, productivity loss ',name1:'#RealityCheck before onboarding any new employee'}
];

@Component({
  selector: 'app-why-scandidate',
  templateUrl: './why-scandidate.component.html',
  styleUrls: ['./why-scandidate.component.css']
})
export class WhyScandidateComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['name', 'name1',];
  dataSource = ELEMENT_DATA;

}
