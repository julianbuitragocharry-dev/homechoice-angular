import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(AuthService);
  const token = loginService.getUserToken();
  const router = inject(Router);

  try {
    if (token) {
      const isValid = await firstValueFrom(loginService.validateToken(token));
      if (isValid) {
        return true;
      } else {
        localStorage.removeItem('token');
      }
    }
  } catch (error) {
    console.error('Error validating token', error);
    localStorage.removeItem('token');
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;

};
