import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArbTicket, IArbTicket } from 'app/arb/models/ticket.model';
import { AuthServerProvider } from 'app/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiTicketUrl = 'http://localhost:8080/api/arb-tickets/';
  authHeader: HttpHeaders;

  constructor(private http: HttpClient, private authServerProvider: AuthServerProvider) {
    this.authHeader = new HttpHeaders().append('Authorization', 'Bearer ' + authServerProvider.getToken());
  }

  getTicketByTicketId(id: number): Observable<IArbTicket> {
    return this.http.get(this.apiTicketUrl + id, { headers: this.authHeader });
  }

  gelAllTickets(page: string = '0', size: string = '10000'): Observable<any> {
    const authParams: HttpParams = new HttpParams();
    authParams.append('page', page);
    authParams.append('size', size);
    return this.http.get(`${this.apiTicketUrl}`, { headers: this.authHeader, params: authParams });
  }
}
