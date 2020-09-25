import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsitutionalUserComponent } from './add-insitutional-user.component';

describe('AddInsitutionalUserComponent', () => {
  let component: AddInsitutionalUserComponent;
  let fixture: ComponentFixture<AddInsitutionalUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsitutionalUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsitutionalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
