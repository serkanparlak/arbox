import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterType, TicketService } from 'app/arb/ticket/ticket.service';

export enum FilterTypeName {}

@Component({
  selector: 'jhi-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss', '../../arb.component.scss']
})
export class LeftMenuComponent implements OnInit {
  filterType = FilterType;

  constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService) {}

  ngOnInit() {}

  onClickToNavigateList(filterType: FilterType) {
    this.ticketService.linkChangeEvent.emit(filterType);
  }
}
