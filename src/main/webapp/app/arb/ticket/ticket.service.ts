import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArbTicket } from 'app/arb/models/ticket.model';
import { Account, AccountService, AuthServerProvider } from 'app/core';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// for left menu
export enum FilterType {
  Unsolved = 'unsolved',
  unsolved = 'Unsolved Tickets',

  Solved = 'solved',
  solved = 'Solved Tickets',

  RecentlyAnswered = 'recentlyanswered',
  recentlyanswered = 'Recently Answered',

  CreatedByMe = 'createdbyme',
  createdbyme = 'Created by me',

  AssignedToMe = 'assignedtome',
  assignedtome = 'Assigned to me'
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiTicketUrl = 'http://localhost:8080/api/arb-tickets';
  account: Account;
  authHeader: HttpHeaders;
  linkChangeEvent = new EventEmitter<FilterType>();

  constructor(private http: HttpClient, private authServerProvider: AuthServerProvider, private accountService: AccountService) {
    this.authHeader = new HttpHeaders().append('Authorization', 'Bearer ' + authServerProvider.getToken());
    accountService.identity().then(account => (this.account = account));
  }

  getTicketByTicketId(id: number): Observable<IArbTicket> {
    return this.http.get(`${this.apiTicketUrl}/${id}`, { headers: this.authHeader });
  }

  gelAllTickets(page: string = '0', size: string = '10000'): Observable<IArbTicket[]> {
    const params = new HttpParams().append('page', page).append('size', size);
    return this.http.get<IArbTicket[]>(`${this.apiTicketUrl}`, { headers: this.authHeader, params });
  }

  getAllByFiltered(
    filterType = FilterType.Unsolved,
    page: any = '0',
    size: string = '10',
    sort: any
  ): Observable<HttpResponse<IArbTicket[]>> {
    // create query params for http request
    let params = new HttpParams().append('page', page).append('size', size);
    if (sort) {
      sort.forEach(val => {
        params.append('sort', val);
      });
    }
    // if filter type is necessary user info, like created or assignee
    const id = filterType == FilterType.CreatedByMe || filterType == FilterType.AssignedToMe ? '/' + this.account.id : '';
    // http request
    return this.http
      .get<IArbTicket[]>(`${this.apiTicketUrl}/${filterType}${id}`, {
        headers: this.authHeader,
        params,
        observe: 'response' // added for behind code ( pipe )
      })
      .pipe(map((res: HttpResponse<IArbTicket[]>) => this.convertDateArrayFromServer(res)));
  }

  createTicket(ticket: IArbTicket): Observable<HttpResponse<IArbTicket>> {
    ticket.date = moment(new Date());
    ticket.state = true;
    ticket.ownerId = this.account.id;
    return this.http.post<IArbTicket>(this.apiTicketUrl, ticket, { headers: this.authHeader, observe: 'response' });
  }

  // date optimization from client
  protected convertDateFromClient(arbTicket: IArbTicket): IArbTicket {
    const copy: IArbTicket = Object.assign({}, arbTicket, {
      date: arbTicket.date != null && arbTicket.date.isValid() ? arbTicket.date.toJSON() : null
    });
    return copy;
  }

  // date optimization from server
  protected convertDateFromServer(res: HttpResponse<IArbTicket>): HttpResponse<IArbTicket> {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  // date array optimization from server
  protected convertDateArrayFromServer(res: HttpResponse<IArbTicket[]>): HttpResponse<IArbTicket[]> {
    if (res.body) {
      res.body.forEach((arbTicket: IArbTicket) => {
        arbTicket.date = arbTicket.date != null ? moment(arbTicket.date) : null;
      });
    }
    return res;
  }
}
