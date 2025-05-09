import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { map } from 'rxjs/operators';

export const noauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.pingCookie().pipe(
    map((hasCookie) => {
      if (hasCookie) {
        router.navigate(['/summary']);
        return false;
      } else {
        return true;
      }
    })
  );
};
