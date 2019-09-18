import { Component, OnInit } from '@angular/core';
import { TicketService } from 'app/arb/ticket/ticket.service';
import { IArbTicket, Priority } from 'app/arb/models/ticket.model';

@Component({
  selector: 'jhi-arb-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['../arb.component.scss']
})
export class TicketComponent implements OnInit {
  priorityHigh = Priority.High;
  priorityMedium = Priority.Medium;
  priorityLow = Priority.Low;

  ticket: IArbTicket;

  ticketList: IArbTicket[];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.getTicketByTicketId(1001).subscribe(ticket => {
      this.ticket = ticket;
    });

    this.ticketService.gelAllTickets().subscribe(res => {
      this.ticketList = res;
    });
  }
}
