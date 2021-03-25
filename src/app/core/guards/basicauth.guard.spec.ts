import { TestBed } from '@angular/core/testing';

import { BasicauthGuard } from './basicauth.guard';

describe('BasicauthGuard', () => {
  let guard: BasicauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BasicauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
