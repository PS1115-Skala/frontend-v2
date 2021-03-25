import { TestBed } from '@angular/core/testing';

import { AdminLabGuard } from './admin-lab.guard';

describe('AdminLabGuard', () => {
  let guard: AdminLabGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminLabGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
