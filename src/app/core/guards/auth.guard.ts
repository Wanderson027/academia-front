import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // verifica se tem token
  if (authService.estaAutenticado()) {
    return true;
  }

  // se não tiver, redireciona pro login
  return router.createUrlTree(['/login']);
};