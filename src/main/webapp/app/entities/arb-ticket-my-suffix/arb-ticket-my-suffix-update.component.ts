import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IArbTicketMySuffix, ArbTicketMySuffix } from 'app/shared/model/arb-ticket-my-suffix.model';
import { ArbTicketMySuffixService } from './arb-ticket-my-suffix.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-arb-ticket-my-suffix-update',
  templateUrl: './arb-ticket-my-suffix-update.component.html'
})
export class ArbTicketMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    priority: [],
    state: [],
    subject: [],
    description: [],
    date: [],
    ownerId: [],
    assigneeId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected arbTicketService: ArbTicketMySuffixService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ arbTicket }) => {
      this.updateForm(arbTicket);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(arbTicket: IArbTicketMySuffix) {
    this.editForm.patchValue({
      id: arbTicket.id,
      priority: arbTicket.priority,
      state: arbTicket.state,
      subject: arbTicket.subject,
      description: arbTicket.description,
      date: arbTicket.date != null ? arbTicket.date.format(DATE_TIME_FORMAT) : null,
      ownerId: arbTicket.ownerId,
      assigneeId: arbTicket.assigneeId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const arbTicket = this.createFromForm();
    if (arbTicket.id !== undefined) {
      this.subscribeToSaveResponse(this.arbTicketService.update(arbTicket));
    } else {
      this.subscribeToSaveResponse(this.arbTicketService.create(arbTicket));
    }
  }

  private createFromForm(): IArbTicketMySuffix {
    return {
      ...new ArbTicketMySuffix(),
      id: this.editForm.get(['id']).value,
      priority: this.editForm.get(['priority']).value,
      state: this.editForm.get(['state']).value,
      subject: this.editForm.get(['subject']).value,
      description: this.editForm.get(['description']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      ownerId: this.editForm.get(['ownerId']).value,
      assigneeId: this.editForm.get(['assigneeId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArbTicketMySuffix>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
