import { inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInterface } from '../models/auth.interface';

export const loginGuard: CanActivateFn = (route, state) => {
  const loggedUserData=signal<UserInterface>(JSON.parse(localStorage.getItem('incidentUser')|| '{}'));
  const router = inject(Router);
    if (Object.keys(loggedUserData()).length > 0) {
    // router.navigateByUrl('/admin/incidents-list');
    return true;
    }
  else
  {
   router.navigateByUrl('/login');
   return false
  }
};
