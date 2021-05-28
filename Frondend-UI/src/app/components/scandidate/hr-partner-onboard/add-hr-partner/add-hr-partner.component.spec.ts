import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHrPartnerComponent } from './add-hr-partner.component';

describe('AddHrPartnerComponent', () => {
  let component: AddHrPartnerComponent;
  let fixture: ComponentFixture<AddHrPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHrPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHrPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
