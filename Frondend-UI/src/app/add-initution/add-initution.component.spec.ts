import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInitutionComponent } from './add-initution.component';

describe('AddInitutionComponent', () => {
  let component: AddInitutionComponent;
  let fixture: ComponentFixture<AddInitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
