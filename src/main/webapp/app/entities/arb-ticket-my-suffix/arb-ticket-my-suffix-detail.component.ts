import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArbTicketMySuffix } from 'app/shared/model/arb-ticket-my-suffix.model';

@Component({
  selector: 'jhi-arb-ticket-my-suffix-detail',
  templateUrl: './arb-ticket-my-suffix-detail.component.html'
})
export class ArbTicketMySuffixDetailComponent implements OnInit {
  arbTicket: IArbTicketMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ arbTicket }) => {
      this.arbTicket = arbTicket;
    });
  }

  previousState() {
    window.history.back();
  }
}
