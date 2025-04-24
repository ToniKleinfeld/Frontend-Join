import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.verifyToken().pipe(
    map((isValid: boolean) => {
      if (isValid) {
        return true;
      } else {
        sessionStorage.clear();
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

// TODO: Testen ob umschrieb erfolgreich!
