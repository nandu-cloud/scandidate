import { TestBed } from '@angular/core/testing';

import { StudentCsvUploadService } from './student-csv-upload.service';

describe('StudentCsvUploadService', () => {
  let service: StudentCsvUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCsvUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
