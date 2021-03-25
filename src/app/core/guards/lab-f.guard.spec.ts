import { TestBed } from '@angular/core/testing';

import { LabFGuard } from './lab-f.guard';

describe('LabFGuard', () => {
  let guard: LabFGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LabFGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
