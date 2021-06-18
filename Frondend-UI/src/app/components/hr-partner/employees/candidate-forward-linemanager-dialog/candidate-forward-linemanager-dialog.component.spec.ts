import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateForwardLinemanagerDialogComponent } from './candidate-forward-linemanager-dialog.component';

describe('CandidateForwardLinemanagerDialogComponent', () => {
  let component: CandidateForwardLinemanagerDialogComponent;
  let fixture: ComponentFixture<CandidateForwardLinemanagerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateForwardLinemanagerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateForwardLinemanagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
