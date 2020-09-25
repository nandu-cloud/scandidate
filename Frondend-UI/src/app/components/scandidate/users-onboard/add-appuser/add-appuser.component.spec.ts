import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppuserComponent } from './add-appuser.component';

describe('AddAppuserComponent', () => {
  let component: AddAppuserComponent;
  let fixture: ComponentFixture<AddAppuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
