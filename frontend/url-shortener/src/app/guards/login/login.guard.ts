import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { UserSession } from '../../Models/user-session';

export const loginGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _activatedRoute = inject(ActivatedRoute);
  const _router = inject(Router);
  const session = localStorage.getItem('session');
  var userSession!: UserSession;

  if (session) {
    userSession = JSON.parse(session) as UserSession;
  }

  if (_authService.CheckIsAuth()) {
    _router.navigate(['user/', userSession.username]);
    return false;
  } else {
    return true;
  }
};
