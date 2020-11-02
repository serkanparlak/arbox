import { Component, Input, OnInit } from '@angular/core';
import { ArbTicket, Priority } from 'app/arb/models/ticket.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'app/arb/ticket/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/arb/authorization/user.service';
import { ArbUser } from 'app/arb/models/user.model';

@Component({
  selector: 'jhi-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss', '../../arb.component.scss']
})
export class UpdateTicketComponent implements OnInit {
  ticket: ArbTicket;
  priority = Priority;
  userList: ArbUser[];
  editTicketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const ticketId = this.route.snapshot.params['id'];
    this.ticketService.getTicketById(ticketId).subscribe(
      (t: ArbTicket) => {
        this.ticket = t;
        this.userService.getAllUsers().subscribe(u => {
          this.userList = u;
          this.editTicketForm.setValue({
            assigneeId: t.assigneeId,
            priority: t.priority,
            subject: t.subject,
            description: t.description
          });
        });
      },
      error => console.log(error)
    );

    this.editTicketForm = this.fb.group({
      assigneeId: [],
      priority: [],
      subject: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.editTicketForm.invalid) {
      return;
    }
    this.ticket.assigneeId = this.editTicketForm.get('assigneeId').value;
    this.ticket.priority = this.editTicketForm.get('priority').value;
    this.ticket.subject = this.editTicketForm.get('subject').value;
    this.ticket.description = this.editTicketForm.get('description').value;
    this.ticketService.updateTicket(this.ticket).subscribe(
      res => {
        if (res.status === 200) {
          this.router.navigate(['/arb/ticket/detail/' + this.ticket.id]);
        }
      },
      error => console.log(error)
    );
  }
}
