import { TestBed } from '@angular/core/testing';

import { AdminOrLabfGuard } from './admin-or-labf.guard';

describe('AdminOrLabfGuard', () => {
  let guard: AdminOrLabfGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminOrLabfGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
