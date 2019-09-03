import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArbTicketMySuffix } from 'app/shared/model/arb-ticket-my-suffix.model';
import { ArbTicketMySuffixService } from './arb-ticket-my-suffix.service';
import { ArbTicketMySuffixComponent } from './arb-ticket-my-suffix.component';
import { ArbTicketMySuffixDetailComponent } from './arb-ticket-my-suffix-detail.component';
import { ArbTicketMySuffixUpdateComponent } from './arb-ticket-my-suffix-update.component';
import { ArbTicketMySuffixDeletePopupComponent } from './arb-ticket-my-suffix-delete-dialog.component';
import { IArbTicketMySuffix } from 'app/shared/model/arb-ticket-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ArbTicketMySuffixResolve implements Resolve<IArbTicketMySuffix> {
  constructor(private service: ArbTicketMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArbTicketMySuffix> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ArbTicketMySuffix>) => response.ok),
        map((arbTicket: HttpResponse<ArbTicketMySuffix>) => arbTicket.body)
      );
    }
    return of(new ArbTicketMySuffix());
  }
}

export const arbTicketRoute: Routes = [
  {
    path: '',
    component: ArbTicketMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'arboxApp.arbTicket.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArbTicketMySuffixDetailComponent,
    resolve: {
      arbTicket: ArbTicketMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'arboxApp.arbTicket.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArbTicketMySuffixUpdateComponent,
    resolve: {
      arbTicket: ArbTicketMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'arboxApp.arbTicket.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArbTicketMySuffixUpdateComponent,
    resolve: {
      arbTicket: ArbTicketMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'arboxApp.arbTicket.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const arbTicketPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ArbTicketMySuffixDeletePopupComponent,
    resolve: {
      arbTicket: ArbTicketMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'arboxApp.arbTicket.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
