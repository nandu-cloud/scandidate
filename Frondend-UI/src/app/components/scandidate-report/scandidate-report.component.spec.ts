import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScandidateReportComponent } from './scandidate-report.component';

describe('ScandidateReportComponent', () => {
  let component: ScandidateReportComponent;
  let fixture: ComponentFixture<ScandidateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScandidateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScandidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
