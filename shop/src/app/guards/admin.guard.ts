import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Role } from '../models/roles.enum';

export const adminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const role = tokenService.getRole();
  if (role !== Role.SUPERADMIN ) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
