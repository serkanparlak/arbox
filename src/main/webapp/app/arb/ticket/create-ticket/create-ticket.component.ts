import { Component, OnInit } from '@angular/core';
import { IArbTicket, Priority } from 'app/arb/models/ticket.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/arb/authorization/user.service';
import { ArbUser } from 'app/arb/models/user.model';
import { TicketService } from 'app/arb/ticket/ticket.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss', '../../arb.component.scss']
})
export class CreateTicketComponent implements OnInit {
  priority = Priority;
  createTicketForm: FormGroup;
  users: ArbUser[];
  createdNewTicket: IArbTicket;
  errorCreateNewTicket: HttpErrorResponse;
  assigneeSelectError: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private ticketService: TicketService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => (this.users = users));
    this.createTicketForm = this.fb.group({
      assigneeId: ['null'],
      priority: [this.priority.Medium],
      subject: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.createTicketForm.get('assigneeId').value === 'null') {
      return (this.assigneeSelectError = true);
    }
    if (this.createTicketForm.invalid) {
      return;
    }
    this.ticketService.createTicket(this.createTicketForm.value).subscribe(
      (res: HttpResponse<IArbTicket>) => {
        if (res.status === 201) {
          this.errorCreateNewTicket = null;
          this.createdNewTicket = res.body;
          this.createTicketForm.reset({ priority: this.priority.Medium });
        }
      },
      (err: HttpErrorResponse) => {
        this.errorCreateNewTicket = err;
      }
    );
  }
}
