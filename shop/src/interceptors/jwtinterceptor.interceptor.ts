import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../app/services/auth-service';
import { inject} from '@angular/core';


export const jwtinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
 
  //getting the token from gthe local storage

  const token = authService.getToken()

  //clone the request

  if (token){
    const newReq= req.clone({
    setHeaders: {
      Authorization : `Bearer ${token}`
    }
  });
  return next(newReq); //send cloned request
  }
   return next(req); //if no token is found
};
