import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/arb/authorization/auth.service';
import { AuthServerProvider, LoginService } from 'app/core';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticate().then(authenticate => {
      if (authenticate) {
        return true;
      } else {
        this.loginService.logout();
        this.router.navigate(['/arb', 'login']);
      }
    });
  }
}
