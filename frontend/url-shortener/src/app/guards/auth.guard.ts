import { Inject, inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _activatedRoute = inject(ActivatedRoute);
  const _router = inject(Router);
  const username = route.params['username'];

  if (!_authService.CheckIsAuth()) {
    _router.navigate(['/user/', username]);
    return false;
  } else {
    return _authService.checkSession(username).pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          _router.navigate(['/user/', username]);
          return false;
        }
      })
    );
  }
};
