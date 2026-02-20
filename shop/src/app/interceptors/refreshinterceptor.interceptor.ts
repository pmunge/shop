import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import {inject } from '@angular/core'
import {TokenService} from '../services/token.service';
import { AuthService} from '../services/auth-service'
import {catchError, switchMap, throwError} from 'rxjs';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);
  const authService = inject(AuthService)

  const token = tokenService.getToken();

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
        const refreshToken =tokenService.getRefreshToken();

        if(!refreshToken){
          authService.logout();
          return throwError(() => error);
        }

        return tokenService.refreshToken(refreshToken).pipe(
          switchMap((res: any) =>{
            const newToken = res.token;
            tokenService.setToken(newToken);

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
