import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccountService, AuthServerProvider } from 'app/core';
import { Observable } from 'rxjs';
import { ArbUser } from 'app/arb/models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected jwtHeader: HttpHeaders;

  constructor(
    @Inject('ApiUserBaseUrl') private apiUserBaseUrl: string,
    private http: HttpClient,
    private accountService: AccountService,
    private authServerrovider: AuthServerProvider
  ) {
    const jwt = `Bearer ${this.authServerrovider.getToken()}`;
    this.jwtHeader = new HttpHeaders().append('Authorization', jwt);
  }

  getAllUsers(): Observable<ArbUser[]> {
    return this.http.get<ArbUser[]>(this.apiUserBaseUrl, { headers: this.jwtHeader });
  }

  getUserById(id: number): Observable<ArbUser> {
    return this.http.get<ArbUser>(`${this.apiUserBaseUrl}/:${id}`, { headers: this.jwtHeader });
  }
}
