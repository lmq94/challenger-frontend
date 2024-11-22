import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  

  if (token && !isTokenExpired(token)) {
    return true;
  } else {
    router.navigate(['/login']);
    return false; 
  }
};


function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000;
    return Date.now() > expiration;
  } catch {
    return true;
  }
}