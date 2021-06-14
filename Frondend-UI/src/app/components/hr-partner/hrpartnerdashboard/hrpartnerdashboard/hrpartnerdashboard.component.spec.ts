import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrpartnerdashboardComponent } from './hrpartnerdashboard.component';

describe('HrpartnerdashboardComponent', () => {
  let component: HrpartnerdashboardComponent;
  let fixture: ComponentFixture<HrpartnerdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrpartnerdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrpartnerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
