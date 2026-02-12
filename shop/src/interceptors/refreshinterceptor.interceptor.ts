import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import {inject } from '@angular/core'
import {AuthService} from '../app/services/auth-service';
import {catchError, switchMap, throwError} from 'rxjs';

export const refreshinterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const token = authService.getToken();

  //attach access token

  let authReq = req;

  if(token){
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) =>{
      if(error.status === 401){
        const refreshToken =authService.getRefreshToken();

        if(!refreshToken){
          authService.logout();
          return throwError(() => error);
        }

        return authService.refreshToken(refreshToken).pipe(
          switchMap((res: any) =>{
            const newToken = res.token;
            authService.setToken(token);

            //retry original req
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(retryReq);
          }),
          catchError(err =>{
            authService.logout();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })

  )
};
