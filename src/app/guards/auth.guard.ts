import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const email = sessionStorage.getItem('email');
  if(!email) {
    return false
  }
  return true;
};
