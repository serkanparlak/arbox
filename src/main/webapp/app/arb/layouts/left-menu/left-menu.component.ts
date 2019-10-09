import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterType, TicketService } from 'app/arb/ticket/ticket.service';

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
    if (this.ticketService.linkChangeEvent.observers.length < 1) {
      this.router.navigate(['/arb/ticket'], { queryParams: { filter: filterType } });
    } else {
      this.ticketService.linkChangeEvent.emit(filterType);
    }
  }
}
