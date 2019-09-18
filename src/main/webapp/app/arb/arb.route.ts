import { Routes } from '@angular/router';
import { comment_routes } from 'app/arb/comment/comment.route';
import { ticket_routes } from 'app/arb/ticket/ticket.route';
import { authorization_routes } from 'app/arb/authorization/authorization.route';

export const arb_routes: Routes = [
  {
    path: 'comment',
    children: [...comment_routes]
  },
  {
    path: 'ticket',
    children: [...ticket_routes]
  },
  {
    path: '',
    children: [...authorization_routes]
  }
];
