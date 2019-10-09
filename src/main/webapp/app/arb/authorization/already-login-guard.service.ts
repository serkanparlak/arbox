import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AccountService, LoginService } from 'app/core';

@Injectable({ providedIn: 'root' })
export class AlreadyLoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private accountService: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.accountService.identity().then(account => {
      if (account) {
        this.router.navigate(['/arb', 'ticket']);
        return false;
      }
      return true;
    });
  }
}
