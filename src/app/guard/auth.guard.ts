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
        authService.logout().subscribe({
          next: () => {
            router.navigate(['/login']);
          }
        });
        return false;
      }
    }),
    catchError(() => {
      return of(false);
    })
  );
};
