import { TestBed } from '@angular/core/testing';

import { AdminlabfService } from './adminlabf.service';

describe('AdminlabfService', () => {
  let service: AdminlabfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminlabfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
