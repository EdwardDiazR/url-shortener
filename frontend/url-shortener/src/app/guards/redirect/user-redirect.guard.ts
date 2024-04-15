import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';

export const userRedirectGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _route = inject(ActivatedRoute);
  const _router = inject(Router);
  const username = route.params['url'];

  console.log(username);


  return _authService.checkUser(username).pipe(
    map((isUser) => {
      console.log(isUser);

      if (!isUser) {
        return true;
      } else {
        _router.navigateByUrl(`/user/${username}`);

        return true;
      }
    })
  );
};
