import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeritQualityComponent } from './merit-quality.component';

describe('MeritQualityComponent', () => {
  let component: MeritQualityComponent;
  let fixture: ComponentFixture<MeritQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeritQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeritQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
