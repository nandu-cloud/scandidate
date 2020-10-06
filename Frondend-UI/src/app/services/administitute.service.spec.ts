import { TestBed } from '@angular/core/testing';

import { AdministituteService } from './administitute.service';

describe('AdministituteService', () => {
  let service: AdministituteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministituteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
