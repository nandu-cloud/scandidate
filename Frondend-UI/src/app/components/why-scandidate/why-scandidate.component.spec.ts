import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyScandidateComponent } from './why-scandidate.component';

describe('WhyScandidateComponent', () => {
  let component: WhyScandidateComponent;
  let fixture: ComponentFixture<WhyScandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyScandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyScandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
