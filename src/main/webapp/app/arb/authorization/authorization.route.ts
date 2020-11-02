import { Routes } from '@angular/router';
import { LoginComponent } from 'app/arb/authorization/login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlreadyLoginGuard } from 'app/arb/authorization/already-login-guard.service';

export const authorization_routes: Routes = [
  {
    path: 'login', // login route
    component: LoginComponent,
    canActivate: [AlreadyLoginGuard]
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AlreadyLoginGuard]
  }
];
