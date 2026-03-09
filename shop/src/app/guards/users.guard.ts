import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Role } from '../models/roles.enum';

export const usersGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const role = tokenService.getRole();
  if (role !== Role.ADMIN && role !== Role.SUPERADMIN) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
