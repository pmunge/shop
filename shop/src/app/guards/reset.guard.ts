import { CanActivateFn, Router  } from '@angular/router';
import { inject } from '@angular/core';

export const resetGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = route.queryParamMap.get('token')

  if(token != null){
    return true
  } else {
    router.navigate(['/forgot']);
    return false;
  }

};
