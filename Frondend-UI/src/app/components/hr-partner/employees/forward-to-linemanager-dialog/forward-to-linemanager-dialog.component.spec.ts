import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardToLinemanagerDialogComponent } from './forward-to-linemanager-dialog.component';

describe('ForwardToLinemanagerDialogComponent', () => {
  let component: ForwardToLinemanagerDialogComponent;
  let fixture: ComponentFixture<ForwardToLinemanagerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardToLinemanagerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardToLinemanagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
