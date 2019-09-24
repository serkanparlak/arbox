import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TicketService } from 'app/arb/ticket/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { ArbTicket, Priority } from 'app/arb/models/ticket.model';

@Component({
  selector: 'jhi-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss', '../../arb.component.scss']
})
export class TicketDetailComponent implements OnInit {
  ticket: ArbTicket;
  priortyType = Priority;
  @ViewChild('removeButton', { static: true }) removeButton: ElementRef<HTMLButtonElement>;
  @ViewChild('deleteButton', { static: true }) deleteButton: ElementRef<HTMLButtonElement>;

  constructor(private ticketService: TicketService, private route: ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.ticketService.getTicketById(id).subscribe(res => (this.ticket = res), err => console.log(err));
  }

  onRemove() {
    let elm = this.removeButton.nativeElement;
    let sureElm = this.deleteButton.nativeElement;
    if (elm.classList.contains('remove')) {
      elm.innerText = 'Remove';
      elm.style.backgroundColor = 'tomato';
      elm.title = 'Remove';
      elm.classList.remove('remove');
      sureElm.hidden = true;
    } else {
      elm.innerText = '✘';
      elm.style.backgroundColor = '#222';
      elm.title = 'Cancel';
      elm.classList.add('remove');
      sureElm.hidden = false;
    }
  }

  onRemoveConfirm() {
    alert('TODO: Deleted work');
  }
}
