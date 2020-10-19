import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScandidateSettingsComponent } from './scandidate-settings.component';

describe('ScandidateSettingsComponent', () => {
  let component: ScandidateSettingsComponent;
  let fixture: ComponentFixture<ScandidateSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScandidateSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScandidateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
