import { AccountService } from 'app/core';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private accountService: AccountService) {}

  isAuthenticate() {
    const promise = Promise.resolve(this.accountService.isAuthenticated());
    return promise;
  }
}
