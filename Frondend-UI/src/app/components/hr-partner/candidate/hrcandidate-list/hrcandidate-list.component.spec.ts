import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrcandidateListComponent } from './hrcandidate-list.component';

describe('HrcandidateListComponent', () => {
  let component: HrcandidateListComponent;
  let fixture: ComponentFixture<HrcandidateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrcandidateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrcandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
