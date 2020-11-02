import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TicketService } from 'app/arb/ticket/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArbTicket, Priority } from 'app/arb/models/ticket.model';
import { CommentService } from 'app/arb/comment/comment.service';

@Component({
  selector: 'jhi-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss', '../../arb.component.scss']
})
export class TicketDetailComponent implements OnInit {
  ticket: ArbTicket;
  priorityType = Priority;
  @ViewChild('removeButton', { static: false }) removeButton: ElementRef<HTMLButtonElement>;
  @ViewChild('deleteButton', { static: false }) deleteButton: ElementRef<HTMLButtonElement>;
  isAnimateRunning: boolean = true;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.ticketService.getTicketById(id).subscribe(res => (this.ticket = res), err => console.log(err));
  }

  onRemove() {
    const elm = this.removeButton.nativeElement;
    const sureElm = this.deleteButton.nativeElement;
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
    this.commentService.deleteCommentByTicketId(this.ticket.id).subscribe(
      res => {
        this.ticketService.deleteTicketById(this.ticket.id).subscribe(
          res2 => {
            this.router.navigate(['arb/ticket']);
          },
          err => console.log('Ticket Delete Error : ' + err)
        );
      },
      err => console.log('Comment Delete Error' + err)
    );
  }

  solvedTicket(ticket: ArbTicket) {
    this.ticketService.updateTicket(ticket).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
}
