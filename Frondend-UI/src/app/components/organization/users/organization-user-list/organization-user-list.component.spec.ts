import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUserListComponent } from './organization-user-list.component';

describe('OrganizationUserListComponent', () => {
  let component: OrganizationUserListComponent;
  let fixture: ComponentFixture<OrganizationUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
