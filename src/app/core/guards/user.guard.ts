// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.getUser()!.role!.name !== 'admin') {
      return true;
    }
    return false;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};