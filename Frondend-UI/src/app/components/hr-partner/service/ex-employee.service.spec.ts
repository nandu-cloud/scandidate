import { TestBed } from '@angular/core/testing';

import { ExEmployeeService } from './ex-employee.service';

describe('ExEmployeeService', () => {
  let service: ExEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
