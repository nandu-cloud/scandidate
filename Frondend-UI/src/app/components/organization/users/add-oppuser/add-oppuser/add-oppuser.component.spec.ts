import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOppuserComponent } from './add-oppuser.component';

describe('AddOppuserComponent', () => {
  let component: AddOppuserComponent;
  let fixture: ComponentFixture<AddOppuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOppuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOppuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
