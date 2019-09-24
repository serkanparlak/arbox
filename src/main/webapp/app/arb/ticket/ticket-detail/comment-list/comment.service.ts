import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Account, AccountService, AuthServerProvider } from 'app/core';
import { ArbComment } from 'app/arb/models/comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  authHeader: HttpHeaders;
  account: Account;

  constructor(
    private http: HttpClient,
    private authServerProvider: AuthServerProvider,
    private accountService: AccountService,
    @Inject('ApiCommentBaseUrl') private apiCommentBaseUrl: string
  ) {
    const auth = 'Bearer ' + this.authServerProvider.getToken();
    this.authHeader = new HttpHeaders().append('Authorization', auth);
    this.accountService.identity().then(x => (this.account = x));
  }

  getAllCommentByTicketId(tId: number): Observable<HttpResponse<ArbComment[]>> {
    return this.http.get<ArbComment[]>(this.apiCommentBaseUrl, { headers: this.authHeader, observe: 'response' });
  }

  addComment(data: ArbComment): Observable<ArbComment> {
    data.ownerId = this.account.id;
    return this.http.post(this.apiCommentBaseUrl, data, { headers: this.authHeader });
  }
}
