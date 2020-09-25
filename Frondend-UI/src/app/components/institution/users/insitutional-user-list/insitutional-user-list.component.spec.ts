import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsitutionalUserListComponent } from './insitutional-user-list.component';

describe('InsitutionalUserListComponent', () => {
  let component: InsitutionalUserListComponent;
  let fixture: ComponentFixture<InsitutionalUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsitutionalUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsitutionalUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
