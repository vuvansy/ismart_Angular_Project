import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService
      .isAuthenticated() // trả về 1 Promise
      .then((authenticated: boolean) => {
        console.log('authenticated');
        console.log(authenticated);
        if (authenticated) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false; // không cho phép sử dụng router
        }
      });
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
