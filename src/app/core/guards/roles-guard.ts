import { CanActivateFn, Router } from '@angular/router';
import { UserInterface } from '../models/auth.interface';
import { inject, signal } from '@angular/core';

export const rolesGuard: CanActivateFn = (route, state) => {
  const loggedUserData=signal<UserInterface>(JSON.parse(localStorage.getItem('incidentUser')|| '{}'));
  const router = inject(Router);
  const roles=route.data['roles'] as string[];

  if (roles.includes(loggedUserData().role)) {
    return true;
  }
  else
  {
   router.navigateByUrl('/admin/NotFound');
   return false
  }
};
