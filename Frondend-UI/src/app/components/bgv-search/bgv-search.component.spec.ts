import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BGVSearchComponent } from './bgv-search.component';

describe('BGVSearchComponent', () => {
  let component: BGVSearchComponent;
  let fixture: ComponentFixture<BGVSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BGVSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BGVSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
