import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArbCommentMySuffix } from 'app/shared/model/arb-comment-my-suffix.model';

type EntityResponseType = HttpResponse<IArbCommentMySuffix>;
type EntityArrayResponseType = HttpResponse<IArbCommentMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ArbCommentMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/arb-comments';

  constructor(protected http: HttpClient) {}

  create(arbComment: IArbCommentMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(arbComment);
    return this.http
      .post<IArbCommentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(arbComment: IArbCommentMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(arbComment);
    return this.http
      .put<IArbCommentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IArbCommentMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IArbCommentMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(arbComment: IArbCommentMySuffix): IArbCommentMySuffix {
    const copy: IArbCommentMySuffix = Object.assign({}, arbComment, {
      date: arbComment.date != null && arbComment.date.isValid() ? arbComment.date.toJSON() : null
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
      res.body.forEach((arbComment: IArbCommentMySuffix) => {
        arbComment.date = arbComment.date != null ? moment(arbComment.date) : null;
      });
    }
    return res;
  }
}
