import { Component, OnInit } from '@angular/core';
import { FilterType, TicketService } from 'app/arb/ticket/ticket.service';
import { IArbTicket, Priority } from 'app/arb/models/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { animates } from 'app/arb/ticket/ticket.animations';

@Component({
  selector: 'jhi-arb-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['../arb.component.scss', './ticket.component.scss'],
  animations: [...animates]
})
export class TicketComponent implements OnInit {
  animateChanger = true;

  page: any = 1;
  totalItems: any;
  itemsPerPage: any = 7;
  previousPage: any;
  predicate: any;
  reverse: boolean;
  links: any;
  filterElement: any;

  activeLinkName: string;
  activeFilterType: FilterType;

  priority = Priority;
  ticketList: IArbTicket[];

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService
  ) {
    this.route.queryParams.subscribe(data => {
      this.animateChanger = false;
      if (data.page) {
        this.page = data.page;
        this.previousPage = data.page;
        this.predicate = data.sort.split(',')[0];
        this.reverse = data.sort.split(',')[1];
      }
      this.activeFilterType = data.filter ? data.filter : FilterType.Unsolved;
      this.activeLinkName = FilterType[this.activeFilterType];
      this.loadAll();
      setTimeout(() => {
        this.animateChanger = true;
      }, 0);
    });
  }

  ngOnInit() {
    this.loadAll();
    if (this.ticketService.linkChangeEvent.observers.length < 1) {
      this.ticketService.linkChangeEvent.subscribe(filterType => {
        this.activeFilterType = filterType;
        this.previousPage = undefined;
        this.page = 1;
        this.transition();
      });
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/arb/ticket'], {
      queryParams: {
        filter: this.activeFilterType,
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    // call loadAll() from router events
  }

  loadAll() {
    this.ticketService
      .getAllByFiltered(this.activeFilterType, this.page - 1, this.itemsPerPage, this.sort())
      .subscribe(
        (res: HttpResponse<IArbTicket[]>) => this.paginateArbTickets(res.body, res.headers),
        (res: HttpErrorResponse) => console.log(res.message)
      );
    this.jhiAlertService.error('asdasd', null, null);
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'date') {
      result.push('date');
    }
    return result;
  }

  protected paginateArbTickets(data: IArbTicket[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.ticketList = data;
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/arb/ticket',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }
}
