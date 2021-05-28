import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPartnerListComponent } from './hr-partner-list.component';

describe('HrPartnerListComponent', () => {
  let component: HrPartnerListComponent;
  let fixture: ComponentFixture<HrPartnerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPartnerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPartnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
