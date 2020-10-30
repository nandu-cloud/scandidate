import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BGVViewComponent } from './bgv-view.component';

describe('BGVViewComponent', () => {
  let component: BGVViewComponent;
  let fixture: ComponentFixture<BGVViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BGVViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BGVViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
