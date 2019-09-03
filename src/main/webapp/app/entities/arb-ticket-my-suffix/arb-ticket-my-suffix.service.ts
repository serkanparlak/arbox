import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArbTicketMySuffix } from 'app/shared/model/arb-ticket-my-suffix.model';

type EntityResponseType = HttpResponse<IArbTicketMySuffix>;
type EntityArrayResponseType = HttpResponse<IArbTicketMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ArbTicketMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/arb-tickets';

  constructor(protected http: HttpClient) {}

  create(arbTicket: IArbTicketMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(arbTicket);
    return this.http
      .post<IArbTicketMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(arbTicket: IArbTicketMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(arbTicket);
    return this.http
      .put<IArbTicketMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IArbTicketMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IArbTicketMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(arbTicket: IArbTicketMySuffix): IArbTicketMySuffix {
    const copy: IArbTicketMySuffix = Object.assign({}, arbTicket, {
      date: arbTicket.date != null && arbTicket.date.isValid() ? arbTicket.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((arbTicket: IArbTicketMySuffix) => {
        arbTicket.date = arbTicket.date != null ? moment(arbTicket.date) : null;
      });
    }
    return res;
  }
}
