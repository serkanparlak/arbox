import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountService } from 'app/core';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {
    return this.accountService.identity().then(account => {
      if (account) {
        return true;
      }
      this.router.navigate(['/arb', 'login']);
      return false;
    });
  }
}
