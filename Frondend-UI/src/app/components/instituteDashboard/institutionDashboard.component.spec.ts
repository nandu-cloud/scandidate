import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionDashboardComponent } from './institutionDashboard.component';

describe('InstitutionDashboardComponent', () => {
  let component: InstitutionDashboardComponent;
  let fixture: ComponentFixture<InstitutionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
