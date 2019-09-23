import { Routes } from '@angular/router';
import { TicketComponent } from 'app/arb/ticket/ticket.component';
import { CreateTicketComponent } from 'app/arb/ticket/create-ticket/create-ticket.component';
import { TicketDetailComponent } from 'app/arb/ticket/ticket-detail/ticket-detail.component';

export const ticket_routes: Routes = [
  {
    path: '',
    component: TicketComponent
  },
  {
    path: 'create',
    component: CreateTicketComponent
  },
  {
    path: 'detail/:id',
    component: TicketDetailComponent
  }
];
