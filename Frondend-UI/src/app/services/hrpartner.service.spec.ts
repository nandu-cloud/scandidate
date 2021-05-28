import { TestBed } from '@angular/core/testing';

import { HrpartnerService } from './hrpartner.service';

describe('HrpartnerService', () => {
  let service: HrpartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrpartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
