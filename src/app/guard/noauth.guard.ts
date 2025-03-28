import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const noauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = sessionStorage.getItem('authToken');

  if (!token) {
    return true;
  }

  return authService.verifyToken(token).pipe(
    map((isValid: boolean) => {
      if (isValid) {
        router.navigate(['/summary']);
        return false;
      } else {
        return true;
      }
    }),
    catchError(() => {
      return of(true);
    })
  );
};
