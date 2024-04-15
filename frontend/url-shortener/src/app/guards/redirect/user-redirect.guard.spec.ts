import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userRedirectGuard } from './user-redirect.guard';

describe('userRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
