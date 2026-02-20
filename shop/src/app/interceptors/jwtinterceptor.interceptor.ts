import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const platformId = inject(PLATFORM_ID);

  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token'); // browser
  } else {
    token = tokenService.getToken(); // SSR
  }

  if (token) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(newReq); // send cloned request
  }

  return next(req); // if no token is found
};
