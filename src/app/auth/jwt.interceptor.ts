import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(AuthService);

  const token = loginService.getUserToken();

  const authReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })

  return next(authReq);
};
