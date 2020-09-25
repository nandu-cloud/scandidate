import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCsvUploadComponent } from './student-csv-upload.component';

describe('StudentCsvUploadComponent', () => {
  let component: StudentCsvUploadComponent;
  let fixture: ComponentFixture<StudentCsvUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCsvUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCsvUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
