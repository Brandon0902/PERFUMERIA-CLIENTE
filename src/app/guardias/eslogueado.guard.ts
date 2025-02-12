import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service'; 

export const eslogueadoGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.esLogueado()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
