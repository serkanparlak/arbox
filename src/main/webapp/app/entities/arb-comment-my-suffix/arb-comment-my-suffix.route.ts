import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArbCommentMySuffix } from 'app/shared/model/arb-comment-my-suffix.model';
import { ArbCommentMySuffixService } from './arb-comment-my-suffix.service';
import { ArbCommentMySuffixComponent } from './arb-comment-my-suffix.component';
import { ArbCommentMySuffixDetailComponent } from './arb-comment-my-suffix-detail.component';
import { ArbCommentMySuffixUpdateComponent } from './arb-comment-my-suffix-update.component';
import { ArbCommentMySuffixDeletePopupComponent } from './arb-comment-my-suffix-delete-dialog.component';
import { IArbCommentMySuffix } from 'app/shared/model/arb-comment-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ArbCommentMySuffixResolve implements Resolve<IArbCommentMySuffix> {
  constructor(private service: ArbCommentMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArbCommentMySuffix> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ArbCommentMySuffix>) => response.ok),
        map((arbComment: HttpResponse<ArbCommentMySuffix>) => arbComment.body)
      );
    }
    return of(new ArbCommentMySuffix());
  }
}

export const arbCommentRoute: Routes = [
  {
    path: '',
    component: ArbCommentMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'arboxApp.arbComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArbCommentMySuffixDetailComponent,
    resolve: {
      arbComment: ArbCommentMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'arboxApp.arbComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArbCommentMySuffixUpdateComponent,
    resolve: {
      arbComment: ArbCommentMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'arboxApp.arbComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArbCommentMySuffixUpdateComponent,
    resolve: {
      arbComment: ArbCommentMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'arboxApp.arbComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const arbCommentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ArbCommentMySuffixDeletePopupComponent,
    resolve: {
      arbComment: ArbCommentMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'arboxApp.arbComment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
