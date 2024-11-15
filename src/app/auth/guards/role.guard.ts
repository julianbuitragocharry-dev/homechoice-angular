import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as string[];

  return authService.getRoles().pipe(
    map((roles) => {
      const hasRole = roles.some(role => expectedRoles.includes(role));
      if (!hasRole) {
        router.navigate(['/unauthorized']);
      }
      return hasRole;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
