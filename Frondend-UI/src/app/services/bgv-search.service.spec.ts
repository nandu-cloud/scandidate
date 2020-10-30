import { TestBed } from '@angular/core/testing';

import { BgvSearchService } from './bgv-search.service';

describe('BgvSearchService', () => {
  let service: BgvSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BgvSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
