import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHroppuserComponent } from './add-hroppuser.component';

describe('AddHroppuserComponent', () => {
  let component: AddHroppuserComponent;
  let fixture: ComponentFixture<AddHroppuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHroppuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHroppuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
