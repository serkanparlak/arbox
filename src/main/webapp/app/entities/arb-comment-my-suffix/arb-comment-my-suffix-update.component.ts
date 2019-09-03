import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IArbCommentMySuffix, ArbCommentMySuffix } from 'app/shared/model/arb-comment-my-suffix.model';
import { ArbCommentMySuffixService } from './arb-comment-my-suffix.service';
import { IArbTicketMySuffix } from 'app/shared/model/arb-ticket-my-suffix.model';
import { ArbTicketMySuffixService } from 'app/entities/arb-ticket-my-suffix';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-arb-comment-my-suffix-update',
  templateUrl: './arb-comment-my-suffix-update.component.html'
})
export class ArbCommentMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  arbtickets: IArbTicketMySuffix[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    date: [],
    content: [],
    isSolution: [],
    ticketId: [],
    ownerId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected arbCommentService: ArbCommentMySuffixService,
    protected arbTicketService: ArbTicketMySuffixService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ arbComment }) => {
      this.updateForm(arbComment);
    });
    this.arbTicketService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArbTicketMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArbTicketMySuffix[]>) => response.body)
      )
      .subscribe((res: IArbTicketMySuffix[]) => (this.arbtickets = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(arbComment: IArbCommentMySuffix) {
    this.editForm.patchValue({
      id: arbComment.id,
      date: arbComment.date != null ? arbComment.date.format(DATE_TIME_FORMAT) : null,
      content: arbComment.content,
      isSolution: arbComment.isSolution,
      ticketId: arbComment.ticketId,
      ownerId: arbComment.ownerId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const arbComment = this.createFromForm();
    if (arbComment.id !== undefined) {
      this.subscribeToSaveResponse(this.arbCommentService.update(arbComment));
    } else {
      this.subscribeToSaveResponse(this.arbCommentService.create(arbComment));
    }
  }

  private createFromForm(): IArbCommentMySuffix {
    return {
      ...new ArbCommentMySuffix(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      content: this.editForm.get(['content']).value,
      isSolution: this.editForm.get(['isSolution']).value,
      ticketId: this.editForm.get(['ticketId']).value,
      ownerId: this.editForm.get(['ownerId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArbCommentMySuffix>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackArbTicketById(index: number, item: IArbTicketMySuffix) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
