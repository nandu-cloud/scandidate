import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBgvReportDialogComponent } from './send-bgv-report-dialog.component';

describe('SendBgvReportDialogComponent', () => {
  let component: SendBgvReportDialogComponent;
  let fixture: ComponentFixture<SendBgvReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendBgvReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBgvReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
