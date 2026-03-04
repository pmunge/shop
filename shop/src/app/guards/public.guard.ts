import { CanActivateFn, Router } from '@angular/router';
import  { inject } from '@angular/core';
import { TokenService } from '../services/token.service';


export const publicGuard: CanActivateFn = (route, state) => {

  const tokenService =inject(TokenService);
  const router = inject(Router);

  let token = tokenService.getToken()
  if( token != null){
    router.navigate(['/home']);
    return true;
  }
  return false
  
};
