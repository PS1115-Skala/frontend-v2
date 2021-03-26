import { TestBed } from '@angular/core/testing';

import { SpecialRequestsService } from './special-requests.service';

describe('SpecialRequestsService', () => {
  let service: SpecialRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
