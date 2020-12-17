import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForOrganizationComponent } from './for-organization.component';

describe('ForOrganizationComponent', () => {
  let component: ForOrganizationComponent;
  let fixture: ComponentFixture<ForOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
