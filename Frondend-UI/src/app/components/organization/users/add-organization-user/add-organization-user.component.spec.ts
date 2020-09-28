import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganizationUserComponent } from './add-organization-user.component';

describe('AddOrganizationUserComponent', () => {
  let component: AddOrganizationUserComponent;
  let fixture: ComponentFixture<AddOrganizationUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrganizationUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrganizationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
