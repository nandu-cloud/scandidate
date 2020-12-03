import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEthicDialogComponent } from './work-ethic-dialog.component';

describe('WorkEthicDialogComponent', () => {
  let component: WorkEthicDialogComponent;
  let fixture: ComponentFixture<WorkEthicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkEthicDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkEthicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
