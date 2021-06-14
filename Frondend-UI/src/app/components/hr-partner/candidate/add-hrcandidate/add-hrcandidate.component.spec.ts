import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHrcandidateComponent } from './add-hrcandidate.component';

describe('AddHrcandidateComponent', () => {
  let component: AddHrcandidateComponent;
  let fixture: ComponentFixture<AddHrcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHrcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHrcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
