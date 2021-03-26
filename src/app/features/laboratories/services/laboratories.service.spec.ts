import { TestBed } from '@angular/core/testing';

import { LaboratoriesService } from './laboratories.service';

describe('LaboratoriesService', () => {
  let service: LaboratoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
