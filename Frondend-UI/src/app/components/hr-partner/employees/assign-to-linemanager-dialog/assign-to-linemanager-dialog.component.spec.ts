import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToLinemanagerDialogComponent } from './assign-to-linemanager-dialog.component';

describe('AssignToLinemanagerDialogComponent', () => {
  let component: AssignToLinemanagerDialogComponent;
  let fixture: ComponentFixture<AssignToLinemanagerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignToLinemanagerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignToLinemanagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
