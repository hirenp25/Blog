import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if(authService.getIsLoggedIn()){
    return true;
  } else {
   router.navigateByUrl("/login")
   return false;
  }
};
