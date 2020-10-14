import { TestBed } from '@angular/core/testing';

import { AdminOrganizationService } from './admin-organization.service';

describe('AdminOrganizationService', () => {
  let service: AdminOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
