import { Routes } from '@angular/router';
import { ticket_routes } from 'app/arb/ticket/ticket.route';
import { authorization_routes } from 'app/arb/authorization/authorization.route';
import { AuthGuardService } from 'app/arb/authorization/auth-guard.service';

export const arb_routes: Routes = [
  // {
  //   path: 'comment',
  //   children: [...comment_routes]
  // },
  {
    path: 'ticket',
    canActivate: [AuthGuardService],
    children: [...ticket_routes]
  },
  {
    path: '',
    children: [...authorization_routes]
  }
];
