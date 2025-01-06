import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Use Angular's inject function
  const isAuthenticated = !!localStorage.getItem('token'); // Check if a token exists

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return true; // Allow access if authenticated
};
