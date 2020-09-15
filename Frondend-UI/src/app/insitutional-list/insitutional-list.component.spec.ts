import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsitutionalListComponent } from './insitutional-list.component';

describe('InsitutionalListComponent', () => {
  let component: InsitutionalListComponent;
  let fixture: ComponentFixture<InsitutionalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsitutionalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsitutionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
